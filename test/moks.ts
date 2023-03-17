import { Voucher } from "@prisma/client";
import voucherRepository from "repositories/voucherRepository";
import { jest } from "@jest/globals";


export const getUndefinedVocher = (code: string) => {
  jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((code: string): any => {
      return undefined;
    });
};

export const successUseVoucher = (code: string) => {
  jest
    .spyOn(voucherRepository, "useVoucher")
    .mockImplementationOnce((code: string): any => {
      const usedVoucher: Voucher = {
        id: 1,
        code: "code",
        discount: 100,
        used: true,
      };
      return usedVoucher;
    });
};

export const usedGetVoucher = (code: string) => {
  jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((code: string): any => {
      const usedVoucher = {
        id: 1,
        code: "code",
        discount: 100,
        used: true,
      };
      return usedVoucher;
    });
};

export const successGetVoucher = (code: string) => {
  jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((code: string): any => {
      const voucher: Voucher = {
        id: 1,
        code: "code",
        discount: 100,
        used: false,
      };
      return voucher;
    });
};

export const createVoucher = (code: string, discount: number) => {
  jest
    .spyOn(voucherRepository, "createVoucher")
    .mockImplementationOnce((): any => {
      const voucher: Voucher = {
        id: 1,
        code,
        discount,
        used: false,
      };

      return voucher;
    });
};

export const invalidDiscountVoucher = (discount: number) => {
  jest
    .spyOn(voucherRepository, "createVoucher")
    .mockImplementationOnce((code: string, discount: number): any => {
      if (discount < 1 || discount > 100) {
        throw new Error();
      }
    });
};