import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../users/entities/users.entity";   // допустим, doctor хранится в users
import { ServiceEntity } from "../service/service_entity/service.entity";
import { Visit } from "../visit/visit.entity";
import { DepartamentEntity } from "../departament/deportament_entity/deportament.entity";

@Entity("visit_service")
export class VisitServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "doctor_id" })
  doctor?: User;

  @ManyToOne(() => ServiceEntity, { nullable: true })
  @JoinColumn({ name: "service_id" })
  service?: ServiceEntity;

  @ManyToOne(() => Visit, { nullable: true })
  @JoinColumn({ name: "visit_id" })
  visit?: Visit;

  @ManyToOne(() => DepartamentEntity, { nullable: true })
  @JoinColumn({ name: "departament_id" })
  departament?: DepartamentEntity;
}
