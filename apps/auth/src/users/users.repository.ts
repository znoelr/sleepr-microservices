import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  protected readonly logger: Logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UserDocument.name)
    userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
