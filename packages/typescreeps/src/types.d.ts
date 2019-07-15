
interface Memory {
    gameRooms: any;
    tasks: any[];
}

interface CreepMemory {
    build: boolean;
    repair: boolean;
    upgrade: boolean;
    targetId: string | null;
    containerId: string | null;
}