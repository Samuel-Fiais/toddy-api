// model Product {
// 	id          String     @id @default(uuid()) @db.VarChar(36)
// 	alternateId Int        @unique @db.Integer
// 	createdAt   DateTime   @default(now()) @db.Date
// 	description String     @db.VarChar(255)
// 	price       Decimal    @default(0) @db.Money
// 	supplierId  String     @db.VarChar(36)
// 	supplier    Supplier   @relation(fields: [supplierId], references: [id])
// 	inventory   Inventory?

import { Supplier } from "@prisma/client";

export class Product {
	id: string;
	alternateId: number;
	createdAt: Date;
	description: string;
	price: number;
	
	supplierId: string;
	supplier: Supplier;
	// inventory: any;
}