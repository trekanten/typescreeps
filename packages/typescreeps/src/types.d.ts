
interface Memory {
    tasks: any[];
}

interface CreepMemory {
    build: boolean;
    repair: boolean;
    targetId: string | null;
    containerId: string | null;
}