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
    "storeId" VARCHAR(36) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(255) NOT NULL,
    "price" MONEY NOT NULL DEFAULT 0,
    "isBulk" BOOLEAN NOT NULL DEFAULT false,
    "conversion" INTEGER,
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
CREATE TABLE "order_items" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "totalValue" MONEY NOT NULL,
    "productId" VARCHAR(36) NOT NULL,
    "orderId" VARCHAR(36) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale-items" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "totalValue" MONEY NOT NULL,
    "saleId" VARCHAR(36) NOT NULL,
    "productId" VARCHAR(36) NOT NULL,

    CONSTRAINT "sale-items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "totalValue" MONEY NOT NULL,
    "cardDiscount" MONEY NOT NULL,
    "paymentId" VARCHAR(36) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_types" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "payment_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "document" VARCHAR(14) NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "storeId" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(36) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_histories" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(36) NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "timestamp" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_histories" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" VARCHAR(36) NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "timestamp" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_histories" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" VARCHAR(36) NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "timestamp" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_histories" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplierId" VARCHAR(36) NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "timestamp" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supplier_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_histories" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" VARCHAR(36) NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "timestamp" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_histories" (
    "id" VARCHAR(36) NOT NULL,
    "alternateId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "saleId" VARCHAR(36) NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "timestamp" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sale_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionToUser" (
    "A" VARCHAR(36) NOT NULL,
    "B" VARCHAR(36) NOT NULL
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
CREATE UNIQUE INDEX "order_items_alternateId_key" ON "order_items"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_alternateId_key" ON "orders"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "sale-items_alternateId_key" ON "sale-items"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "sales_alternateId_key" ON "sales"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_types_alternateId_key" ON "payment_types"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "stores_alternateId_key" ON "stores"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "stores_name_key" ON "stores"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_alternateId_key" ON "users"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_alternateId_key" ON "employees"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "employees_document_key" ON "employees"("document");

-- CreateIndex
CREATE UNIQUE INDEX "employees_userId_key" ON "employees"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_alternateId_key" ON "permissions"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_description_key" ON "permissions"("description");

-- CreateIndex
CREATE UNIQUE INDEX "user_histories_alternateId_key" ON "user_histories"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_histories_alternateId_key" ON "employee_histories"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "product_histories_alternateId_key" ON "product_histories"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_histories_alternateId_key" ON "supplier_histories"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "order_histories_alternateId_key" ON "order_histories"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "sale_histories_alternateId_key" ON "sale_histories"("alternateId");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToUser_AB_unique" ON "_PermissionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToUser_B_index" ON "_PermissionToUser"("B");

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale-items" ADD CONSTRAINT "sale-items_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale-items" ADD CONSTRAINT "sale-items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_histories" ADD CONSTRAINT "user_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_histories" ADD CONSTRAINT "employee_histories_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_histories" ADD CONSTRAINT "product_histories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_histories" ADD CONSTRAINT "supplier_histories_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_histories" ADD CONSTRAINT "order_histories_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_histories" ADD CONSTRAINT "sale_histories_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
