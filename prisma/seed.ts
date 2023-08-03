import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cultura01 = await prisma.cultura.upsert({
    where: { id: 'e3f7717b-c26f-424d-a6d8-e74fb7cd639c' },
    update: {},
    create: {
      id: 'e3f7717b-c26f-424d-a6d8-e74fb7cd639c',
      nome: 'Trigo',
    },
  });

  const cultura02 = await prisma.cultura.upsert({
    where: { id: '60525a19-5252-4dad-b20f-180a93127f46' },
    update: {},
    create: {
      id: '60525a19-5252-4dad-b20f-180a93127f46',
      nome: 'Soja',
    },
  });

  const produtor01 = await prisma.produtorRural.upsert({
    where: { id: 'fc114e33-96b7-4648-9456-c9ec1752073f' },
    update: {},
    create: {
      id: 'fc114e33-96b7-4648-9456-c9ec1752073f',
      cpf_cnpj: '01234567890',
      produtor: 'João José da Jarapatingua',
      fazenda: 'Fazenda Nova Divindade',
      cidade: 'Palmas',
      estado: 'TO',
      area_total: 10,
      area_cultivo: 8,
      area_vegetacao: 2,
    },
  });

  const produtor02 = await prisma.produtorRural.upsert({
    where: { id: '1da1bdae-075d-412a-8f3f-7b4d7f7d4070' },
    update: {},
    create: {
      id: '1da1bdae-075d-412a-8f3f-7b4d7f7d4070',
      cpf_cnpj: '01234567891',
      produtor: 'Marcelo Farias Junior',
      fazenda: 'Fazenda 3 corações',
      cidade: 'Londrina',
      estado: 'PR',
      area_total: 20,
      area_cultivo: 13,
      area_vegetacao: 7,
    },
  });

  await prisma.produtorRural.update({
    where: { id: 'fc114e33-96b7-4648-9456-c9ec1752073f' },
    data: {
      culturas: {
        connect: [
          { id: 'e3f7717b-c26f-424d-a6d8-e74fb7cd639c' },
          { id: '60525a19-5252-4dad-b20f-180a93127f46' },
        ],
      },
    },
  });

  await prisma.produtorRural.update({
    where: { id: '1da1bdae-075d-412a-8f3f-7b4d7f7d4070' },
    data: {
      culturas: {
        connect: [{ id: '60525a19-5252-4dad-b20f-180a93127f46' }],
      },
    },
  });

  console.log({ cultura01, cultura02, produtor01, produtor02 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
