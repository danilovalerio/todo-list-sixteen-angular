//modelar os dados da nossa tarefa
export class Todo {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public done: boolean
  ) {}
}
