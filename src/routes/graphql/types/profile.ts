import { GraphQLObjectType, GraphQLFloat, GraphQLBoolean } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeIdGQLEnumType } from './memberTypeId.js';
import { memberType } from './memberType.js';
import { MemberTypeId } from '../../member-types/schemas.js';
import { ContextValue } from '../types.js';
import DataLoader from 'dataloader';

type Source = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeId;
}

export const profile = new GraphQLObjectType<Source, ContextValue>({
  name: 'profile',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLFloat,
    },
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: MemberTypeIdGQLEnumType,
    },
    memberType: {
      type: memberType,
      resolve(source, _args, context, info) {
        const { fastify, dataLoaders } = context;

        let dl = dataLoaders.get(info.fieldNodes);

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const memberTypes = await fastify.prisma.memberType.findMany({
              where: {
                id: { in: [...ids] },
              },
            });
            const sortedMemberTypesInIdsOrder = ids.map((id) =>
            memberTypes.find((memberType) => memberType.id === id),
            );
            return sortedMemberTypesInIdsOrder;
          });

          dataLoaders.set(info.fieldNodes, dl);
        }

        return dl.load(source.memberTypeId);
      },
    },
  }),
});
