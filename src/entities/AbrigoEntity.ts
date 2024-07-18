import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EnderecoEntity from "./Endereco";
import { criaSenhaCriptografada } from "../utils/senhaCriptografada";
import PetEntity from "./PetEntity";

@Entity()
export default class AbrigoEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  senha: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  celular: string;
  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  endereco?: EnderecoEntity;
  @OneToOne(() => PetEntity, (pet) => pet.abrigo)
  pets!: PetEntity[];

  constructor(
    nome: string,
    senha: string,
    email: string,
    celular: string,
    endereco?: EnderecoEntity
  ) {
    this.nome = nome;
    this.senha = senha;
    this.email = email;
    this.celular = celular;
    this.endereco = endereco;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async cripografarSenha(senha: string): Promise<void> {
    if (this.senha) {
      this.senha = criaSenhaCriptografada(this.senha);
    }
  }
}
