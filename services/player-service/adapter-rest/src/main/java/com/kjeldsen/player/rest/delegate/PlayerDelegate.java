package com.kjeldsen.player.rest.delegate;

import com.kjeldsen.player.application.usecases.CreatePlayerUseCase;
import com.kjeldsen.player.application.usecases.FindPlayersQuery;
import com.kjeldsen.player.application.usecases.FindPlayersUseCase;
import com.kjeldsen.player.application.usecases.GeneratePlayersUseCase;
import com.kjeldsen.player.application.usecases.NewPlayer;
import com.kjeldsen.player.domain.Player;
import com.kjeldsen.player.domain.PlayerAge;
import com.kjeldsen.player.domain.PlayerPosition;
import com.kjeldsen.player.rest.api.PlayerApiDelegate;
import com.kjeldsen.player.rest.model.CreatePlayerRequest;
import com.kjeldsen.player.rest.model.GeneratePlayersRequest;
import com.kjeldsen.player.rest.model.PlayerResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Component
public class PlayerDelegate implements PlayerApiDelegate {

    private final CreatePlayerUseCase createPlayerUseCase;
    private final GeneratePlayersUseCase generatePlayersUseCase;
    private final FindPlayersUseCase findPlayersUseCase;

    @Override
    public ResponseEntity<Void> createPlayer(CreatePlayerRequest createPlayerRequest) {
        NewPlayer newPlayer = NewPlayer.builder()
            .age(PlayerAge.of(createPlayerRequest.getAge()))
            .position(PlayerPosition.valueOf(createPlayerRequest.getPosition().name()))
            .points(createPlayerRequest.getPoints())
            .build();
        createPlayerUseCase.create(newPlayer);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Void> generatePlayer(GeneratePlayersRequest generatePlayersRequest) {
        generatePlayersUseCase.generate(generatePlayersRequest.getNumberOfPlayers());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<PlayerResponse>> getAllPlayers(com.kjeldsen.player.rest.model.PlayerPosition position, Integer size, Integer page) {
        FindPlayersQuery query = FindPlayersQuery.builder()
            .position(position != null ? PlayerPosition.valueOf(position.name()) : null)
            .size(size)
            .page(page)
            .build();
        List<Player> players = findPlayersUseCase.find(query);
        List<PlayerResponse> response = players.stream()
            .map(player -> new PlayerResponse()
                .id(UUID.fromString(player.getId().value()))
                .name(player.getName().value())
                .age(player.getAge().value())
                .position(com.kjeldsen.player.rest.model.PlayerPosition.valueOf(player.getPosition().name()))
                .actualSkills(player.getActualSkills().values().entrySet().stream()
                    .collect(Collectors.toMap(entry -> entry.getKey().name(), entry -> entry.getValue().toString())))
            ).toList();
        return ResponseEntity.ok(response);
    }
}
