import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from "./entities/post.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postsRepo: Repository<Posts>
  ) {}
  createUser(createPostDto: CreatePostDto, author: User) {
    const newPost = this.postsRepo.create({ ...createPostDto, author });
    return this.postsRepo.save(newPost);
  }

  create(createPostDto: CreatePostDto) {
    return this.postsRepo.save(createPostDto);
  }

  findAll() {
    return this.postsRepo.find({ relations: ["author"] });
  }

  findOne(id: number) {
    return this.postsRepo.findOne({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postsRepo.update({ id }, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.postsRepo.delete({ id });
    return id;
  }
}
