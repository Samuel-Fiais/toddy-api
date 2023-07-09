-- CreateTable
CREATE TABLE "suppliers" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "document" VARCHAR(14) NOT NULL,
    "tradeName" VARCHAR(255) NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "email" VARCHAR(36) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(255) NOT NULL,
    "price" MONEY NOT NULL DEFAULT 0,
    "supplierId" VARCHAR(36) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventories" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "productId" VARCHAR(36) NOT NULL,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "totalValue" MONEY NOT NULL,
    "arrivalData" DATE NOT NULL,
    "supplierId" VARCHAR(36) NOT NULL,
    "totalOrdersId" VARCHAR(36) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "total_orders" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "totalValue" MONEY NOT NULL,
    "arrivalData" DATE NOT NULL,

    CONSTRAINT "total_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "totalValue" MONEY NOT NULL,
    "totalSalesId" VARCHAR(36) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "total_sales" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "totalValue" MONEY NOT NULL,

    CONSTRAINT "total_sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_alternateId_key" ON "suppliers"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_document_key" ON "suppliers"("document");

-- CreateIndex
CREATE UNIQUE INDEX "products_alternateId_key" ON "products"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "inventories_alternateId_key" ON "inventories"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "inventories_productId_key" ON "inventories"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_alternateId_key" ON "orders"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "total_orders_alternateId_key" ON "total_orders"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "sales_alternateId_key" ON "sales"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "total_sales_alternateId_key" ON "total_sales"("alternateId");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_totalOrdersId_fkey" FOREIGN KEY ("totalOrdersId") REFERENCES "total_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_totalSalesId_fkey" FOREIGN KEY ("totalSalesId") REFERENCES "total_sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
