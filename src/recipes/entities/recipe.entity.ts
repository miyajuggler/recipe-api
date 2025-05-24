import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('recipes')
export class Recipes extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public making_time: string;

  @Column()
  public serves: string;

  @Column()
  public ingredients: string;

  @Column()
  public cost: number;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
}

export default Recipes;
