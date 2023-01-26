export type CouponT = {
  id: string
  name: string
  expiry: Date
  discount: number
};

export type CouponModelT = Omit<Coupon, 'id'>;
