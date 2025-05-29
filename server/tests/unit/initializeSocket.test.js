const { describe, test, beforeEach, expect, jest } = require("@jest/globals");



// Mock socket.io.Server voordat het wordt geïmporteerd
jest.mock("socket.io", () => {
    return {
        Server: jest.fn(() => ({
            on: jest.fn(),
        })),
    };
});
// Nu pas de Server importeren (gebruikt de gemockte versie)
const { Server } = require("socket.io");

// Mock de event-registratie modules
jest.mock("../../infra/socket/events/gameEvents", () => ({
    registerGameEvents: jest.fn(),
}));
jest.mock("../../infra/socket/events/questionEvents", () => ({
    registerQuestionEvents: jest.fn(),
}));
jest.mock("../../infra/socket/events/teamEvents", () => ({
    registerTeamEvents: jest.fn(),
}));
jest.mock("../../infra/socket/events/categoryEvents", () => ({
    registerCategoryEvents: jest.fn(),
}));
jest.mock("../../infra/socket/events/moderatorEvents", () => ({
    registerModeratorEvents: jest.fn(),
}));
jest.mock("../../infra/socket/events/teamQueAnsEvents", () => ({
    registerTeamQueAnsEvents: jest.fn(),
}));
jest.mock("../../infra/socket/events/strategieEvents", () => ({
    registerStrategyEvents: jest.fn(),
}));


const { initializeSocket } = require("../../infra/socket");


const { registerGameEvents } = require("../../infra/socket/events/gameEvents");
const { registerQuestionEvents } = require("../../infra/socket/events/questionEvents.js");
const { registerTeamEvents } = require("../../infra/socket/events/teamEvents.js");
const { registerCategoryEvents } = require("../../infra/socket/events/categoryEvents.js");
const { registerModeratorEvents } = require("../../infra/socket/events/moderatorEvents.js");
const { registerTeamQueAnsEvents } = require("../../infra/socket/events/teamQueAnsEvents.js");
const { registerStrategyEvents } = require("../../infra/socket/events/strategieEvents.js");


describe("initializeSocket", () => {
    let server, io, mockSocket;


    beforeEach(() => {
        server = {}; // Mock server object
        io = initializeSocket(server);

        // Mock socket object
        mockSocket = { id: "123", on: jest.fn() };

        // Simuleer een nieuwe verbinding
        const connectionHandler = io.on.mock.calls.find(([event]) => event === "connection")[1];
        if (connectionHandler) {
            connectionHandler(mockSocket);
        }


    });

    test("moet een nieuwe Server instantie maken", () => {
        expect(Server).toHaveBeenCalledWith(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });
    });

    test("moet een 'connection' event listener registreren", () => {
        expect(io.on).toHaveBeenCalledWith("connection", expect.any(Function));
    });

    test("moet de event-registratie functies aanroepen bij een nieuwe verbinding", () => {
        expect(registerGameEvents).toHaveBeenCalledWith(io, mockSocket);
        expect(registerQuestionEvents).toHaveBeenCalledWith(io, mockSocket);
        expect(registerTeamEvents).toHaveBeenCalledWith(io, mockSocket);
        expect(registerCategoryEvents).toHaveBeenCalledWith(io, mockSocket);
        expect(registerStrategyEvents).toHaveBeenCalledWith(io, mockSocket);
        expect(registerModeratorEvents).toHaveBeenCalledWith(io, mockSocket);
        expect(registerTeamQueAnsEvents).toHaveBeenCalledWith(io, mockSocket);
    });

    test("moet een disconnect event registreren", () => {
        expect(mockSocket.on).toHaveBeenCalledWith("disconnect", expect.any(Function));
    });
});
