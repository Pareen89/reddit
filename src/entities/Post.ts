import { IsEmail, Length } from "class-validator";
import {
  Entity as TOENTITY,
  Column,
  Index,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import bycrpt from "bcrypt";
import { Exclude } from "class-transformer";

import Entity from "./Entity";
import User from "./User";
import { makeId, slugify } from "../util/helpers";
import Sub from "./Sub";

@TOENTITY("posts")
export default class Post extends Entity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Index()
  @Column()
  identifier: string; // 7 character id

  @Column()
  title: string;

  @Index()
  @Column()
  slug: string;

  @Column({ nullable: true, type: "text" })
  body: string;

  @Column()
  subName: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub;

  @BeforeInsert()
  makeIdandSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}
