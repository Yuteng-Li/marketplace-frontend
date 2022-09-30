export class Address {
    address_id!: number;
    user_id!: number;
	recipient_name!: string;
	street!: string;
	street2!: string;
	city!: string;
	state!: string;
	zip!: string;
	is_shipping!: boolean;
	is_billing!: boolean;
}
