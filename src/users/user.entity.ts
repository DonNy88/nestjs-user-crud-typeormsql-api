import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number
	s
	@Column({ length: 64 })
	name!: string

	@Column({ name: 'middle_name', length: 64, nullable: true })
	middleName?: string

	@Column({ length: 64 })
	surname!: string

	@Column({ name: 'birth_place', length: 64, nullable: true })
	birthPlace!: string

	@Column({ name: 'birth_date', nullable: true })
	birthDate!: Date

	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt!: Date

	@DeleteDateColumn({ name: 'deleted_at', select: false })
	deletedAt?: Date

	// static async saveOrReturnFoundOne(user: Exclude<User, 'createdAt' | 'updatedAt' | 'deletedAt'>) {
	// 	if (!!user?.id) {
	// 		const userFound = await User.findOne(user.id)

	// 		if (!!userFound) {
	// 			return userFound
	// 		}
	// 	}

	// 	return await User.save(user)
	// }
}
