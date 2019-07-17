import Axios from 'axios';
import { Task } from '@typescreeps/common';

export class API {
  private instance = Axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
      common: {
        'Content-Type': 'application/json',
      },
    },
  });

  public async getSegment(segment: number): Promise<any> {
    return await this.instance.get(`screeps/segment/${segment}`).then((r: any) => r.data);
  }

  public async setSegment(segment: number, data: any): Promise<null> {
    return await this.instance.post(`screeps/segment/${segment}`, data).then((r: any) => r.data);
  }

  public async getTasks(): Promise<Task[]> {
    return await this.instance.get('screeps/tasks').then((r: any) => r.data);
  }

  public async addTask(task: Task): Promise<null> {
    return await this.instance.post('screeps/tasks', task).then((r: any) => r.data);
  }

  public async deleteTask(taskName: string): Promise<null> {
    return await this.instance.delete(`screeps/tasks/${taskName}`).then((r: any) => r.data);
  }

  public async updateTask(taskName: string, task: Task): Promise<null> {
    return await this.instance.patch(`screeps/tasks/${taskName}`, task).then((r: any) => r.data);
  }

  public async getRoooms(): Promise<string[]> {
    return await this.instance.get('screeps/rooms').then((r: any) => r.data);
  }
}

export const api = new API();
