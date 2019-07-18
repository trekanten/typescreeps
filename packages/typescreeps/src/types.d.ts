
interface Memory {
    gameRooms: any;
    tasks: any[];
}

interface CreepMemory {
    build: boolean;
    deposit: boolean;
    repair: boolean;
    upgrade: boolean;
    targetId: string | null;
    targetType: RESOURCE_ENERGY | 'tombstone' | null;
    containerId: string | null;
}