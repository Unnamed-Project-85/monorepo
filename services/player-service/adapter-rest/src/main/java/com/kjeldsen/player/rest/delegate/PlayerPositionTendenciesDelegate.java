package com.kjeldsen.player.rest.delegate;

import com.kjeldsen.player.application.repositories.PlayerPositionTendencyReadRepository;
import com.kjeldsen.player.application.usecases.UpdatePlayerPositionTendencyUseCase;
import com.kjeldsen.player.application.usecases.UpdatePlayerTendencies;
import com.kjeldsen.player.domain.PlayerPosition;
import com.kjeldsen.player.domain.PlayerPositionTendency;
import com.kjeldsen.player.domain.PlayerSkill;
import com.kjeldsen.player.rest.api.PlayerPositionTendenciesApiDelegate;
import com.kjeldsen.player.rest.model.PlayerPositionParam;
import com.kjeldsen.player.rest.model.PlayerPositionTendencyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class PlayerPositionTendenciesDelegate implements PlayerPositionTendenciesApiDelegate {
    private final UpdatePlayerPositionTendencyUseCase updatePlayerPositionTendencyUseCase;
    private final PlayerPositionTendencyReadRepository playerPositionTendencyReadRepository;

    @Override
    public ResponseEntity<List<PlayerPositionTendencyResponse>> getAllPlayerPositionTendencies() {
        List<PlayerPositionTendencyResponse> response = playerPositionTendencyReadRepository.find()
            .stream()
            .map(playerPositionTendency -> new PlayerPositionTendencyResponse()
                .position(PlayerPositionParam.valueOf(playerPositionTendency.getPosition().name()))
                .tendencies(playerPositionTendency.getTendencies().entrySet().stream()
                    .collect(Collectors.toMap(entry -> entry.getKey().name(), entry -> entry.getValue().toString())))
                ._default(playerPositionTendency.isDefault())
            )
            .toList();

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<PlayerPositionTendencyResponse> getPlayerPositionTendency(PlayerPositionParam position) {
        PlayerPositionTendency playerPositionTendency = playerPositionTendencyReadRepository.get(PlayerPosition.valueOf(position.name()));
        PlayerPositionTendencyResponse response = new PlayerPositionTendencyResponse()
            .position(PlayerPositionParam.valueOf(playerPositionTendency.getPosition().name()))
            .tendencies(playerPositionTendency.getTendencies().entrySet().stream()
                .collect(Collectors.toMap(entry -> entry.getKey().name(), entry -> entry.getValue().toString())))
            ._default(playerPositionTendency.isDefault());
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<PlayerPositionTendencyResponse> updatePlayerPositionTendency(PlayerPositionParam position, Map<String, String> requestBody) {
        PlayerPositionTendency updatedPlayerPositionTendency = updatePlayerPositionTendencyUseCase.update(UpdatePlayerTendencies.builder()
            .position(PlayerPosition.valueOf(position.name()))
            .tendencies(requestBody.entrySet().stream().collect(Collectors.toMap(entry -> PlayerSkill.valueOf(entry.getKey()), entry -> Integer.parseInt(entry.getValue()))))
            .build());
        PlayerPositionTendencyResponse response = new PlayerPositionTendencyResponse().position(PlayerPositionParam.valueOf(updatedPlayerPositionTendency.getPosition().name()))
            .tendencies(updatedPlayerPositionTendency.getTendencies().entrySet().stream()
                .collect(Collectors.toMap(entry -> entry.getKey().name(), entry -> entry.getValue().toString())))
            ._default(updatedPlayerPositionTendency.isDefault());
        return ResponseEntity.ok(response);
    }
}
