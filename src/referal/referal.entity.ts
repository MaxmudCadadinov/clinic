import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn,  ManyToOne, JoinColumn,} from "typeorm";
import { User } from "../users/entities/users.entity";
import { VisitReferalEntity } from '../visit_referal/visit_referal.entity'


@Entity("referal")
export class ReferalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, default: "" })
  name: string;

  @Column({ type: "varchar", length: 255, default: "" })
  phone: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "int", default: 0 })
  percent: number;

  @Column({ type: "int", default: 1 })
  status: number;

  @CreateDateColumn({type: "datetime", default: () => "CURRENT_TIMESTAMP(6)"})
  created: Date;

  @UpdateDateColumn({type: "datetime", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
  updated: Date;

  @ManyToOne(() => User, (user) => user.registeredReferals, { nullable: true })
  @JoinColumn({ name: "register_id" })
  register?: User;

  @ManyToOne(() => User, (user) => user.modifiedReferals, { nullable: true })
  @JoinColumn({ name: "modify_id" })
  modify?: User;

  @OneToMany(() => VisitReferalEntity, (vr) => vr.referal)
  visitReferals: VisitReferalEntity[];
}
