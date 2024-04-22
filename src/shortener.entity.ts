import { OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl, Matches, Max, MaxLength } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Shortener {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsUrl()
  @IsNotEmpty()
  @MaxLength(1024)
  @Column({ type: "text" })
  url: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(12)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'short should not contain spaces',
  })
  @Column({ type: "text" })
  short?: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createAt: Date;
}

export class ShortenerDto extends OmitType(Shortener, ['id', 'createAt']) {}