// import { faker } from '@faker-js/faker';
import { faker } from "@faker-js/faker/locale/en";

export type User = {
  userId: string;
  fullname: string;
  avatar: string;
  postImg: string;
};

export const USERS: User[] = [];

export function createRandomUser(): User {
  return {
    userId: faker.datatype.uuid(),
    fullname: faker.internet.userName(),
    avatar: faker.image.avatar(),
    postImg: faker.image.animals(640, 640, true),
  };
}

Array.from({ length: 10 }).forEach(() => {
  USERS.push(createRandomUser());
});
