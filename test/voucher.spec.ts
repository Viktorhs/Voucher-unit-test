import voucherService from "services/voucherService";
import * as mocks from "./moks"

describe("Apply Voucher", () => {
  it("should apply the voucher with success", () => {
    const code = "code";
    const amount = 100;

    mocks.successGetVoucher(code);
    mocks.successUseVoucher(code);

    const promise = voucherService.applyVoucher(code, amount);

    expect(promise).resolves.toEqual(
      expect.objectContaining({
        amount,
        discount: expect.any(Number),
        finalAmount: expect.any(Number),
        applied: expect.any(Boolean),
      })
    );
  });

  it("should not apply the voucher when it not exists", () => {
    const code = "code";
    const amount = 100;

    mocks.getUndefinedVocher(code);

    const promise = voucherService.applyVoucher(code, amount);

    expect(promise).rejects.toEqual(expect.any(Object));
  });

  it("should not apply the voucher when it is already used", () => {
    const code = "code";
    const amount = 100;

    mocks.usedGetVoucher(code);

    const promise = voucherService.applyVoucher(code, amount);

    expect(promise).resolves.toEqual(
      expect.objectContaining({
        applied: false,
      })
    );
  });

  it("should not apply the voucher when the amount is not sufficient", () => {
    const code = "code";
    const amount = 90;

    mocks.successGetVoucher(code);

    const promise = voucherService.applyVoucher(code, amount);

    expect(promise).resolves.toEqual(
      expect.objectContaining({
        applied: false,
      })
    );
  });
});

describe("Create Voucher", () => {
  it("should be able to create a Voucher", async () => {
    const code = "code";
    const discount = 100;

    mocks.getUndefinedVocher(code);
    mocks.createVoucher(code, discount);

    const result = await voucherService.createVoucher(code, discount);

    expect(result).toEqual(undefined);
  });

  it("should not be able to create a voucher when it already exists", async () => {
    const code = "code";
    const discount = 100;

    mocks.successGetVoucher(code);

    const promise = voucherService.createVoucher(code, discount);

    expect(promise).rejects.toEqual(expect.any(Object));
  });

  it("should not be able to create a voucher when discount is invalid", async () => {
    const code = "code";
    const discount = 0;

    mocks.getUndefinedVocher(code);
    mocks.invalidDiscountVoucher(discount);

    const promise = voucherService.createVoucher(code, discount);

    expect(promise).rejects.toThrowError();
  })
});