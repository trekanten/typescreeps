import Axios from 'axios';
import { Task, LinkJob } from '@typescreeps/common';

export class API {
  private instance = Axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
      common: {
        'Content-Type': 'application/json',
      },
    },
  });

  public async getLinkJobs(): Promise<LinkJob[]> {
    return await this.instance.get('screeps/links').then((r: any) => r.data);
  }

  public async addLinkJob(linkJob: LinkJob): Promise<null> {
    return await this.instance.post('screeps/links', linkJob).then((r: any) => r.data);
  }

  public async deleteLinkJob(id: string): Promise<null> {
    return await this.instance.delete(`screeps/links/${id}`).then((r: any) => r.data);
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
