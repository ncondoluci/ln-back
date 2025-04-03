import {
  Account,
  VMAccountTagged,
} from "../../src/interfaces/accountInterface";
import { normalizeTag, sortByLocation } from "../../src/utils/account";
import { DeepPartial } from "../../src/utils/testUtils";

const mockAccount = {
  crmid: "123",
  name: "Cuenta Test",
  tags: [{ name: "Turismo en Buenos Aires" }],
  branches: [{ location: 1000 }, { location: 200 }],
  benefits: [
    { value: "20", program_name: ["Classic"] },
    { value: "50", program_name: ["Black"] },
  ],
  images: ["imagen.jpg"],
} as DeepPartial<Account>;

describe("normalizeTag", () => {
  it("Debe retornar un string normalizado de un tag", () => {
    const result = normalizeTag(mockAccount as Account);
    expect(result).toBe("turismoenbuenosaires");
  });

  it("Debe normalizar un tag con mayúsculas y espacios", () => {
    const result = normalizeTag({
      tags: [{ name: "  Promo Verano 2024  " }],
    } as Account);
    expect(result).toBe("promoverano2024");
  });

  it("Debe retornar string vacío si el tag está vacío", () => {
    const result = normalizeTag({ tags: [{ name: "" }] } as Account);
    expect(result).toBe("");
  });

  it("Debe retornar un arreglo vacío si no hay tags", () => {
    const result = normalizeTag({} as Account);
    expect(result).toBe("");
  });

  it("Debe retornar un arreglo vacío si no hay tags", () => {
    const result = normalizeTag({ tags: [] } as unknown as Account);
    expect(result).toBe("");
  });

  it("Debe retornar string vacío si el primer tag es undefined", () => {
    const result = normalizeTag({ tags: [undefined as any] } as Account);
    expect(result).toBe("");
  });
});

describe("sortByLocation", () => {
  const accounts = [
    { location: 1000, name: "Cuenta 1" },
    { location: 200, name: "Cuenta 2" },
    { location: 500, name: "Cuenta 3" },
  ] as VMAccountTagged[];

  it("Debe ordenar las cuentas ordenadas por ubicación más cercana", () => {
    const result = sortByLocation(accounts, true);
    expect(result[0].location).toEqual(200);
    expect(result[1].location).toEqual(500);
    expect(result[2].location).toEqual(1000);
  });

  it("Debe ordenar las cuentas ordenadas por ubicación más lejana", () => {
    const result = sortByLocation(accounts, false);

    expect(result[0].location).toEqual(1000);
    expect(result[1].location).toEqual(500);
    expect(result[2].location).toEqual(200);
  });

  it("Debe retornar un arreglo vacío si no hay cuentas", () => {
    const result = sortByLocation([], true);
    expect(result.length).toEqual(0);
  });
});
