/*
const GameService = require("../../application/services/GameService");
const GameRepository = require("../../domain/repositories/GameRepository");
const test = require("node:test");
const {beforeEach, describe} = require("node:test");

// Mock GameRepository
jest.mock("../../domain/repositories/GameRepository");

describe("GameService", () => {
    let gameService, mockGameRepository;

    beforeEach(() => {
        mockGameRepository = new GameRepository(); // Mocked versie
        gameService = new GameService();
        gameService.gameRepository = mockGameRepository; // Vervang echte repo met mock
    });

    test("addGame moet een game toevoegen", async () => {
        mockGameRepository.addGame.mockResolvedValue({ game_id: 1, room_id: "room123" });

        const result = await gameService.addGame("room123");
        expect(mockGameRepository.addGame).toHaveBeenCalledWith("room123");
        expect(result).toEqual({ game_id: 1, room_id: "room123" });
    });

    test("startGame moet game status updaten naar 'active'", async () => {
        mockGameRepository.getGameByGameId.mockResolvedValue({ game_id: 1 });
        mockGameRepository.updateGameStatus.mockResolvedValue(true);

        const result = await gameService.addGame({ game_id: 1 });

        expect(mockGameRepository.getGameByGameId).toHaveBeenCalledWith(1);
        expect(mockGameRepository.updateGameStatus).toHaveBeenCalledWith(1, "active");
        expect(result).toEqual({ success: true, message: "Game started" });
    });

    test("startGame moet een fout geven als game niet bestaat", async () => {
        mockGameRepository.getGameByGameId.mockResolvedValue(null);

        await expect(gameService.addGame({ game_id: 999 })).rejects.toThrow("Game not found");
    });

    test("endGame moet game status updaten naar 'finished'", async () => {
        mockGameRepository.updateGameStatus.mockResolvedValue(true);

        const result = await gameService.endGame(1);

        expect(mockGameRepository.updateGameStatus).toHaveBeenCalledWith(1, "finished");
        expect(result).toEqual({ success: true, message: "Game ended" });
    });
});
*/
