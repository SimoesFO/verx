-- CreateTable
CREATE TABLE "ProdutorRural" (
    "id" TEXT NOT NULL,
    "cpf_cnpj" VARCHAR(14) NOT NULL,
    "produtor" VARCHAR(300) NOT NULL,
    "fazenda" VARCHAR(300) NOT NULL,
    "cidade" VARCHAR(100) NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "area_total" INTEGER NOT NULL,
    "area_cultivo" INTEGER NOT NULL,
    "area_vegetacao" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProdutorRural_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cultura" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(300) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cultura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CulturaToProdutorRural" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CulturaToProdutorRural_AB_unique" ON "_CulturaToProdutorRural"("A", "B");

-- CreateIndex
CREATE INDEX "_CulturaToProdutorRural_B_index" ON "_CulturaToProdutorRural"("B");

-- AddForeignKey
ALTER TABLE "_CulturaToProdutorRural" ADD CONSTRAINT "_CulturaToProdutorRural_A_fkey" FOREIGN KEY ("A") REFERENCES "Cultura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CulturaToProdutorRural" ADD CONSTRAINT "_CulturaToProdutorRural_B_fkey" FOREIGN KEY ("B") REFERENCES "ProdutorRural"("id") ON DELETE CASCADE ON UPDATE CASCADE;
