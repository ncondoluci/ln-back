import { AccountService } from '../../services/accountService';
import { Account } from '../../interfaces/accountInterface';

const mockRepo: Account[] = [
  {
    name: 'Account 1',
    crmid: 'abc123',
    tags: [{ name: 'Salud' }],
    haveVoucher: true,
    images: [{ url: 'https://image1.jpg' }],
    branches: [{ location: 5 }, { location: 10 }],
    benefits: [
      { value: '50', program_name: ['Plan A'] },
      { value: '30', program_name: ['Plan A', 'Plan B'] },
    ],
  },
  {
    name: 'Account 2',
    crmid: 'def456',
    tags: [{ name: 'Deporte' }],
    haveVoucher: false,
    images: [{ url: 'https://image2.jpg' }],
    branches: [{ location: 3 }],
    benefits: [
      { value: '20', program_name: ['Plan C'] },
    ],
  },
];

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    process.env.LN_BASE_URL = 'https://lnbase.com';
    service = await AccountService.create(mockRepo);
  });

  describe('getAccountsVMByTag', () => {
    it('should return accounts matching the tag', () => {
      const result = service.getAccountsVMByTag('salud');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Account 1');
      expect(result[0].url).toBe('https://lnbase.com/abc123');
      expect(result[0].location).toBe(5);
      expect(result[0].type_benefit).toEqual([
        { program_name: 'Plan A', value: 50 },
        { program_name: 'Plan B', value: 30 },
      ]);
    });

    it('should return empty array when tag does not match', () => {
      const result = service.getAccountsVMByTag('educación');
      expect(result).toEqual([]);
    });

    it('should paginate and sort correctly', () => {
      const result = service.getAccountsVMByTag('salud', '1', '0', 'false');
      expect(result).toHaveLength(1);
    });
  });

  describe('getAccountByFlag', () => {
    it('should return accounts with matching haveVoucher flag', () => {
      const result = service.getAccountByFlag('true');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Account 1');
    });

    it('should sort accounts by name descending', () => {
      const result = service.getAccountByFlag('false', '2', '0', 'true');
      expect(result[0].name).toBe('Account 2');
    });

    it('should paginate correctly', () => {
      const result = service.getAccountByFlag('true', '1', '0', 'true');
      expect(result).toHaveLength(1);
    });
  });
});
