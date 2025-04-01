import { ProgramPriority, programPriorityMap } from "../enums/benefitsEnums.js";
import {
  Account,
  Benefit,
  Branch,
  VMAccountTagged,
  ProgramBenefit,
  AccountFilterOptions,
} from "../interfaces/accountInterface.js";

export function prepareViewModel(
  repository: Account[],
  { tag, limitNum, offsetNum, orderAscBool }: AccountFilterOptions
): VMAccountTagged[] {
  const viewModel = repository.reduce(
    (accountsVM: VMAccountTagged[], account: Account) => {
      // Serializa el valor de la etiqueta
      const accTag = normalizeTag(account);

      if (accTag !== tag) {
        return accountsVM;
      }

      // Obtiene la información necesaria para construir el view model
      const accURL = `${process.env.LN_BASE_URL}/${account.crmid}`;
      const closestLocation = getClosestBranch(account.branches);
      const benefits = getHighestBenefitByProgram(account.benefits);

      // Arma el view model que se envía al frontend
      accountsVM.push({
        url: accURL,
        name: account.name,
        location: closestLocation,
        type_benefit: benefits,
        image: account.images[0],
      });

      return accountsVM;
    },
    [] as VMAccountTagged[]
  );

  return sortByLocation(viewModel, orderAscBool).slice(
    offsetNum,
    limitNum + offsetNum
  );
}

export function normalizeTag(account: Account) {
  return (account.tags[0]?.name ?? "").replaceAll(" ", "").toLowerCase();
}

export function getClosestBranch(branchs: Branch[]): number {
  const initialBranch = branchs[0].location;

  return branchs.reduce(
    (min, cur) => Math.min(min, cur.location),
    initialBranch
  );
}

export function getHighestBenefitByProgram(
  benefits: Benefit[]
): ProgramBenefit[] {
  // Aplanar la lista de beneficios
  const benefitsVM = benefits.flatMap((benefit) =>
    benefit.program_name.map((program_name) => ({
      program_name,
      value: Number.parseInt(benefit.value) || 0,
    }))
  );

  // Calcular el beneficio mayor por cada programa en un objeto { programa: valor }
  const highests = benefitsVM.reduce<Record<string, number>>(
    (acc, { program_name, value }) => {
      const current = acc[program_name] ?? 0;

      if (value > current) {
        acc[program_name] = value;
      }

      return acc;
    },
    {}
  );

  // Ordenar los beneficios Black>Premium>Classic
  const defaultPriority = Object.keys(ProgramPriority).length / 2;

  const getPriority = (program: string): number =>
    programPriorityMap[program] ?? defaultPriority;

  // Convertir el objeto a un array de { program_name, value }
  const benefitsArray = Object.entries(highests).map(
    ([program_name, value]) => ({
      program_name,
      value,
    })
  );

  // Devolver array ordenando los beneficios Black > Premium > Classic
  return benefitsArray.sort(
    (a, b) => getPriority(a.program_name) - getPriority(b.program_name)
  );
}

export function sortByLocation(
  accounts: VMAccountTagged[],
  orderAscBool: boolean
) {
  return accounts.sort((a, b) => {
    return orderAscBool ? a.location - b.location : b.location - a.location;
  });
}
