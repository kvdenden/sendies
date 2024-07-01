import prisma from "./prisma";

type SearchParams = Partial<{
  email: string;
  address: string;
}>;

export function register(did: string, email: string, address: string) {
  return prisma.user.upsert({
    where: {
      privyDid: did,
    },
    update: {
      email,
      address,
    },
    create: {
      privyDid: did,
      email,
      address,
    },
  });
}

export function search(params: SearchParams) {
  if (params.email)
    return prisma.user.findFirst({
      where: {
        email: { equals: params.email, mode: "insensitive" },
      },
    });

  if (params.address)
    return prisma.user.findFirst({
      where: {
        address: { equals: params.address, mode: "insensitive" },
      },
    });
}
