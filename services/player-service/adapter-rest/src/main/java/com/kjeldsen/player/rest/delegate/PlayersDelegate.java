package com.kjeldsen.player.rest.delegate;

import com.kjeldsen.player.application.repositories.PlayerReadRepository;
import com.kjeldsen.player.application.usecases.CreatePlayerUseCase;
import com.kjeldsen.player.application.usecases.FindPlayersQuery;
import com.kjeldsen.player.application.usecases.GeneratePlayersUseCase;
import com.kjeldsen.player.application.usecases.NewPlayer;
import com.kjeldsen.player.domain.Player;
import com.kjeldsen.player.domain.PlayerAge;
import com.kjeldsen.player.domain.PlayerPosition;
import com.kjeldsen.player.rest.api.PlayersApiDelegate;
import com.kjeldsen.player.rest.model.CreatePlayerRequest;
import com.kjeldsen.player.rest.model.GeneratePlayersRequest;
import com.kjeldsen.player.rest.model.PlayerPositionParam;
import com.kjeldsen.player.rest.model.PlayerResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class PlayersDelegate implements PlayersApiDelegate {

    private final CreatePlayerUseCase createPlayerUseCase;
    private final GeneratePlayersUseCase generatePlayersUseCase;
    private final PlayerReadRepository playerReadRepository;

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
    public ResponseEntity<List<PlayerResponse>> generatePlayer(GeneratePlayersRequest generatePlayersRequest) {
        List<Player> players = generatePlayersUseCase.generate(generatePlayersRequest.getNumberOfPlayers());
        List<PlayerResponse> response = players.stream().map(this::mapToResponse).toList();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<List<PlayerResponse>> getAllPlayers(PlayerPositionParam position, Integer size, Integer page) {
        FindPlayersQuery query = FindPlayersQuery.builder()
            .position(position != null ? PlayerPosition.valueOf(position.name()) : null)
            .size(size)
            .page(page)
            .build();
        List<Player> players = playerReadRepository.find(query);
        List<PlayerResponse> response = players.stream().map(this::mapToResponse).toList();
        return ResponseEntity.ok(response);
    }

    private PlayerResponse mapToResponse(Player player) {
        return new PlayerResponse()
            .id(UUID.fromString(player.getId().value()))
            .name(player.getName().value())
            .age(player.getAge().value())
            .position(PlayerPositionParam.valueOf(player.getPosition().name()))
            .actualSkills(player.getActualSkills().values().entrySet().stream()
                .collect(Collectors.toMap(entry -> entry.getKey().name(), entry -> entry.getValue().toString())));
    }
}
