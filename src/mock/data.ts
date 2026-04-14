/**
 * Mock data for all API endpoints
 * Bu fayl barcha backend endpointlari uchun mock ma'lumotlarni saqlaydi
 */

import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'

// ==================== PROFILE & AUTH ====================

export const mockProfile = {
  id: 1,
  username: 'admin',
  first_name: 'Admin',
  last_name: 'Identity Biznes',
  phone: '+998901234567',
  status: 1,
  avatar: {
    id: 'avatar-1',
    type: 1,
    preview_link: '',
    link: '',
    name: 'avatar.png',
    original_name: 'avatar.png',
    mime: 'image/png',
  },
  permissions: Object.values(PERMISSION_ENUM).reduce((acc: any, perm) => {
    acc[perm] = { all: true }
    return acc
  }, {}),
  template_theme: [],
  language: 'ru',
}

// ==================== CUSTOMERS ====================

export const mockCustomers = [
  {
    id: 1,
    first_name: 'Aziz',
    last_name: 'Karimov',
    middle_name: 'Bahromovich',
    passport_series: 'AB',
    passport_number: '1234567',
    passport_given_date: '2020-01-15',
    passport_expiration_date: '2030-01-15',
    passport_given_place: 'Toshkent sh. IIB',
    passport_citizenship: 'UZB',
    birth_date: '1990-05-20',
    birth_place: 'Toshkent',
    gender: 0,
    pinfl: '31205900500018',
    tin: '123456789',
    created_at: '2024-01-10',
    updated_at: '2024-01-10',
    addresses: [
      {
        id: 1,
        type: 1,
        address: 'Chilonzor tumani, 19-kvartal',
        region_id: 1,
        district_id: 1,
        mahalla_id: 1,
        region: { id: 1, name: 'Toshkent shahri' },
        district: { id: 1, name: 'Chilonzor tumani', region_id: 1 },
        mahalla: { id: 1, name: 'Guliston MFY', district_id: 1 },
      },
    ],
    phones: [
      { id: 1, phone: '+998901234567', type: 1, comment: 'Shaxsiy telefon' },
      { id: 2, phone: '+998712345678', type: 2, comment: 'Ish telefoni' },
    ],
  },
  {
    id: 2,
    first_name: 'Dilnoza',
    last_name: 'Rahimova',
    middle_name: 'Sherzodovna',
    passport_series: 'AC',
    passport_number: '7654321',
    passport_given_date: '2019-06-20',
    passport_expiration_date: '2029-06-20',
    passport_given_place: 'Samarqand sh. IIB',
    passport_citizenship: 'UZB',
    birth_date: '1995-03-15',
    birth_place: 'Samarqand',
    gender: 1,
    pinfl: '31503950300024',
    tin: '987654321',
    created_at: '2024-02-15',
    updated_at: '2024-02-15',
    addresses: [
      {
        id: 2,
        type: 1,
        address: 'Mirzo Ulugbek tumani, Buyuk Ipak Yuli',
        region_id: 1,
        district_id: 2,
        mahalla_id: 2,
        region: { id: 1, name: 'Toshkent shahri' },
        district: { id: 2, name: 'Mirzo Ulugbek tumani', region_id: 1 },
        mahalla: { id: 2, name: 'Navruz MFY', district_id: 2 },
      },
    ],
    phones: [{ id: 3, phone: '+998937654321', type: 1, comment: 'Shaxsiy' }],
  },
  {
    id: 3,
    first_name: 'Sardor',
    last_name: 'Toshmatov',
    middle_name: 'Ikromovich',
    passport_series: 'AA',
    passport_number: '5555555',
    passport_given_date: '2021-03-10',
    passport_expiration_date: '2031-03-10',
    passport_given_place: 'Namangan sh. IIB',
    passport_citizenship: 'UZB',
    birth_date: '1988-11-25',
    birth_place: 'Namangan',
    gender: 0,
    pinfl: '31111880250032',
    tin: '555666777',
    created_at: '2024-03-01',
    updated_at: '2024-03-01',
    addresses: [
      {
        id: 3,
        type: 1,
        address: "Yakkasaroy tumani, Shota Rustaveli ko'chasi",
        region_id: 1,
        district_id: 3,
        mahalla_id: 3,
        region: { id: 1, name: 'Toshkent shahri' },
        district: { id: 3, name: 'Yakkasaroy tumani', region_id: 1 },
        mahalla: { id: 3, name: 'Tinchlik MFY', district_id: 3 },
      },
    ],
    phones: [{ id: 4, phone: '+998945555555', type: 1, comment: '' }],
  },
]

// ==================== BRANCHES ====================

export const mockBranches = [
  {
    id: 1,
    inn: 123456789,
    name: 'Bosh ofis',
    address: "Toshkent sh., Amir Temur ko'chasi, 1",
    created_at: 1704067200,
    updated_at: 1704067200,
  },
  {
    id: 2,
    inn: 987654321,
    name: 'Chilonzor filiali',
    address: 'Toshkent sh., Chilonzor tumani, 9-kvartal',
    created_at: 1704153600,
    updated_at: 1704153600,
  },
  {
    id: 3,
    inn: 555666777,
    name: 'Samarqand filiali',
    address: "Samarqand sh., Registon ko'chasi, 15",
    created_at: 1704240000,
    updated_at: 1704240000,
  },
]

// ==================== TARIFFS ====================

export const mockTariffs = [
  {
    id: 1,
    name: 'Standart',
    is_annual: true,
    percent: 24,
    min_amount: 1000000,
    max_amount: 50000000,
    min_initial_fee: 10,
    max_initial_fee: 50,
    min_period: 3,
    max_period: 12,
  },
  {
    id: 2,
    name: 'Premium',
    is_annual: true,
    percent: 18,
    min_amount: 5000000,
    max_amount: 100000000,
    min_initial_fee: 20,
    max_initial_fee: 60,
    min_period: 6,
    max_period: 24,
  },
  {
    id: 3,
    name: 'Express',
    is_annual: false,
    percent: 3,
    min_amount: 500000,
    max_amount: 20000000,
    min_initial_fee: 0,
    max_initial_fee: 30,
    min_period: 1,
    max_period: 6,
  },
]

// ==================== INSTALLMENTS ====================

export const mockInstallments = [
  {
    id: 1,
    customer_id: 1,
    customer: mockCustomers[0],
    branch_id: 1,
    branch: mockBranches[0],
    tariff_id: 1,
    tariff: mockTariffs[0],
    type: 1,
    amount: 10000000,
    initial_fee: 2000000,
    description: 'Telefon uchun nasiya',
    starts_in: '2024-02-01',
    next_pay_date: '2024-03-01',
    created_at: 1706745600,
    updated_at: 1706745600,
    graphs: [
      { installment_id: 1, amount: 1500000, paid_amount: 1500000, overdue_days: 0, status: 2, starts_in: '2024-03-01' },
      { installment_id: 1, amount: 1500000, paid_amount: 1500000, overdue_days: 0, status: 2, starts_in: '2024-04-01' },
      { installment_id: 1, amount: 1500000, paid_amount: 0, overdue_days: 5, status: 1, starts_in: '2024-05-01' },
      { installment_id: 1, amount: 1500000, paid_amount: 0, overdue_days: 0, status: 0, starts_in: '2024-06-01' },
      { installment_id: 1, amount: 1500000, paid_amount: 0, overdue_days: 0, status: 0, starts_in: '2024-07-01' },
    ],
    cards: [
      {
        id: 'card-1',
        customer_id: 1,
        customer: mockCustomers[0],
        number: '8600 **** **** 1234',
        expiry: '08/26',
        phone: '+998901234567',
        status: 2,
        balance: '5000000',
      },
    ],
    guarantors: [mockCustomers[1]],
    documents: [
      {
        id: 'doc-1',
        type: 'document',
        preview_url: '',
        url: '',
        name: 'passport.pdf',
        original_name: 'passport_scan.pdf',
        mime: 'application/pdf',
      },
    ],
    images: [
      { id: 'img-1', type: 'image', preview_url: '', url: '', name: 'photo.jpg', original_name: 'customer_photo.jpg', mime: 'image/jpeg' },
    ],
    comments: [
      { id: 1, installment_id: 1, creator_id: 1, creator_name: 'Admin Identity Biznes', comment: "Mijoz o'z vaqtida to'layapti" },
      { id: 2, installment_id: 1, creator_id: 1, creator_name: 'Admin Identity Biznes', comment: 'Hujjatlar tekshirildi' },
    ],
  },
  {
    id: 2,
    customer_id: 2,
    customer: mockCustomers[1],
    branch_id: 2,
    branch: mockBranches[1],
    tariff_id: 2,
    tariff: mockTariffs[1],
    type: 1,
    amount: 25000000,
    initial_fee: 5000000,
    description: 'Noutbuk uchun nasiya',
    starts_in: '2024-03-01',
    next_pay_date: '2024-04-01',
    created_at: 1709251200,
    updated_at: 1709251200,
    graphs: [
      { installment_id: 2, amount: 2200000, paid_amount: 2200000, overdue_days: 0, status: 2, starts_in: '2024-04-01' },
      { installment_id: 2, amount: 2200000, paid_amount: 0, overdue_days: 0, status: 1, starts_in: '2024-05-01' },
      { installment_id: 2, amount: 2200000, paid_amount: 0, overdue_days: 0, status: 0, starts_in: '2024-06-01' },
    ],
    cards: [],
    guarantors: [],
    documents: [],
    images: [],
    comments: [],
  },
  {
    id: 3,
    customer_id: 3,
    customer: mockCustomers[2],
    branch_id: 1,
    branch: mockBranches[0],
    tariff_id: 3,
    tariff: mockTariffs[2],
    type: 1,
    amount: 5000000,
    initial_fee: 0,
    description: 'Maishiy texnika',
    starts_in: '2024-01-15',
    next_pay_date: '2024-02-15',
    created_at: 1705276800,
    updated_at: 1705276800,
    graphs: [
      { installment_id: 3, amount: 900000, paid_amount: 900000, overdue_days: 0, status: 2, starts_in: '2024-02-15' },
      { installment_id: 3, amount: 900000, paid_amount: 900000, overdue_days: 0, status: 2, starts_in: '2024-03-15' },
      { installment_id: 3, amount: 900000, paid_amount: 900000, overdue_days: 0, status: 2, starts_in: '2024-04-15' },
      { installment_id: 3, amount: 900000, paid_amount: 900000, overdue_days: 0, status: 2, starts_in: '2024-05-15' },
      { installment_id: 3, amount: 900000, paid_amount: 900000, overdue_days: 0, status: 2, starts_in: '2024-06-15' },
    ],
    cards: [],
    guarantors: [mockCustomers[0]],
    documents: [],
    images: [],
    comments: [{ id: 3, installment_id: 3, creator_id: 1, creator_name: 'Admin Identity Biznes', comment: "Nasiya to'liq yopildi" }],
  },
]

// ==================== TRANSACTIONS ====================

export const mockTransactionTypes = [
  { id: 1, name: 'Naqd pul', is_system: false, created_at: 1704067200, updated_at: 1704067200 },
  { id: 2, name: 'Karta orqali', is_system: true, created_at: 1704067200, updated_at: 1704067200 },
  { id: 3, name: "Bank o'tkazmasi", is_system: false, created_at: 1704067200, updated_at: 1704067200 },
]

export const mockTransactions = [
  {
    id: 1,
    installment_id: 1,
    installment: {
      id: 1,
      customer_id: 1,
      branch_id: 1,
      tariff_id: 1,
      type: 1,
      amount: '10000000',
      initial_fee: '2000000',
      description: 'Telefon uchun nasiya',
      sms_notify: true,
      any_card_charge: false,
      is_blacklist: false,
      status: 1,
      period: 5,
      plum_id: null,
      starts_in: '2024-02-01',
      next_pay_date: null,
      created_at: '2024-02-01',
      updated_at: '2024-02-01',
      deleted_at: null,
      withdrawn_auto_charge: false,
    },
    customer_id: 1,
    customer: mockCustomers[0],
    card_id: 1,
    card: null,
    transaction_type_id: 1,
    transaction_type: {
      id: 1,
      name_uz: 'Naqd pul',
      name_ru: 'Наличные',
      name_en: 'Cash',
      is_system: false,
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      deleted_at: null,
    },
    amount: 1500000,
    created_at: 1709337600,
    updated_at: 1709337600,
  },
  {
    id: 2,
    installment_id: 1,
    installment: {
      id: 1,
      customer_id: 1,
      branch_id: 1,
      tariff_id: 1,
      type: 1,
      amount: '10000000',
      initial_fee: '2000000',
      description: 'Telefon uchun nasiya',
      sms_notify: true,
      any_card_charge: false,
      is_blacklist: false,
      status: 1,
      period: 5,
      plum_id: null,
      starts_in: '2024-02-01',
      next_pay_date: null,
      created_at: '2024-02-01',
      updated_at: '2024-02-01',
      deleted_at: null,
      withdrawn_auto_charge: false,
    },
    customer_id: 1,
    customer: mockCustomers[0],
    card_id: 2,
    card: null,
    transaction_type_id: 2,
    transaction_type: {
      id: 2,
      name_uz: 'Karta orqali',
      name_ru: 'По карте',
      name_en: 'Card payment',
      is_system: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      deleted_at: null,
    },
    amount: 1500000,
    created_at: 1711929600,
    updated_at: 1711929600,
  },
]

// ==================== USERS ====================

export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    phone: '+998901234567',
    first_name: 'Admin',
    last_name: 'Identity Biznes',
    role: { id: '1', name: 'Administrator', created_at: '2024-01-01', updated_at: '2024-01-01' },
    status: 1,
    password: null,
    password_confirmation: null,
  },
  {
    id: 2,
    username: 'operator1',
    phone: '+998901112233',
    first_name: 'Sherzod',
    last_name: 'Aliyev',
    role: { id: '2', name: 'Operator', created_at: '2024-01-01', updated_at: '2024-01-01' },
    status: 1,
    password: null,
    password_confirmation: null,
  },
  {
    id: 3,
    username: 'manager1',
    phone: '+998904445566',
    first_name: 'Gulnora',
    last_name: 'Tosheva',
    role: { id: '3', name: 'Manager', created_at: '2024-01-01', updated_at: '2024-01-01' },
    status: 1,
    password: null,
    password_confirmation: null,
  },
]

// ==================== ROLES ====================

export const mockRoles = [
  {
    id: 1,
    name: 'Administrator',
    permission_groups: [
      {
        id: 1,
        name: 'User Management',
        slug: 'user',
        permissions: [
          { id: 1, name: 'View All Users', slug: 'user_view_all', branches: [{ id: 1, name: 'Bosh ofis', enabled: true, editable: true }] },
          { id: 2, name: 'Create User', slug: 'user_create', branches: [{ id: 1, name: 'Bosh ofis', enabled: true, editable: true }] },
          { id: 3, name: 'Edit User', slug: 'user_edit', branches: [{ id: 1, name: 'Bosh ofis', enabled: true, editable: true }] },
        ],
      },
      {
        id: 2,
        name: 'Customer Management',
        slug: 'customer',
        permissions: [
          {
            id: 4,
            name: 'View All Customers',
            slug: 'customer_view_all',
            branches: [{ id: 1, name: 'Bosh ofis', enabled: true, editable: true }],
          },
          {
            id: 5,
            name: 'Create Customer',
            slug: 'customer_create',
            branches: [{ id: 1, name: 'Bosh ofis', enabled: true, editable: true }],
          },
        ],
      },
    ],
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: 2,
    name: 'Operator',
    permission_groups: [
      {
        id: 2,
        name: 'Customer Management',
        slug: 'customer',
        permissions: [
          {
            id: 4,
            name: 'View All Customers',
            slug: 'customer_view_all',
            branches: [{ id: 1, name: 'Bosh ofis', enabled: true, editable: false }],
          },
        ],
      },
    ],
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
]

// ==================== REGIONS / DISTRICTS / MAHALLAS ====================

export const mockRegions = [
  { id: 1, name: 'Toshkent shahri' },
  { id: 2, name: 'Toshkent viloyati' },
  { id: 3, name: 'Samarqand viloyati' },
  { id: 4, name: 'Buxoro viloyati' },
  { id: 5, name: "Farg'ona viloyati" },
  { id: 6, name: 'Andijon viloyati' },
  { id: 7, name: 'Namangan viloyati' },
  { id: 8, name: 'Qashqadaryo viloyati' },
  { id: 9, name: 'Surxondaryo viloyati' },
  { id: 10, name: 'Jizzax viloyati' },
  { id: 11, name: 'Sirdaryo viloyati' },
  { id: 12, name: 'Xorazm viloyati' },
  { id: 13, name: 'Navoiy viloyati' },
  { id: 14, name: "Qoraqalpog'iston Respublikasi" },
]

export const mockDistricts: Record<number, any[]> = {
  1: [
    { id: 1, name: 'Chilonzor tumani', region_id: 1 },
    { id: 2, name: 'Mirzo Ulugbek tumani', region_id: 1 },
    { id: 3, name: 'Yakkasaroy tumani', region_id: 1 },
    { id: 4, name: 'Shayxontohur tumani', region_id: 1 },
    { id: 5, name: 'Yunusobod tumani', region_id: 1 },
    { id: 6, name: 'Sergeli tumani', region_id: 1 },
  ],
  2: [
    { id: 7, name: 'Chirchiq shahri', region_id: 2 },
    { id: 8, name: 'Olmaliq shahri', region_id: 2 },
    { id: 9, name: 'Angren shahri', region_id: 2 },
  ],
  3: [
    { id: 10, name: 'Samarqand shahri', region_id: 3 },
    { id: 11, name: 'Urgut tumani', region_id: 3 },
  ],
}

export const mockMahallas: Record<number, any[]> = {
  1: [
    { id: 1, name: 'Guliston MFY', district_id: 1 },
    { id: 2, name: 'Bunyodkor MFY', district_id: 1 },
  ],
  2: [
    { id: 3, name: 'Navruz MFY', district_id: 2 },
    { id: 4, name: 'Ipak Yuli MFY', district_id: 2 },
  ],
  3: [
    { id: 5, name: 'Tinchlik MFY', district_id: 3 },
    { id: 6, name: 'Mustaqillik MFY', district_id: 3 },
  ],
}

// ==================== SCORING - Credit History ====================

export const mockCreditHistory = [
  {
    id: 1,
    status: 2,
    request: {
      pinfl: 31205900500018,
      passport_series: 'AB',
      passport_number: '1234567',
      passport_given_date: '2020-01-15',
      first_name: 'Aziz',
      last_name: 'Karimov',
      middle_name: 'Bahromovich',
      phone: 998901234567,
      extra_phone: null,
      birth_date: '1990-05-20',
      region_id: 1,
      district_id: 1,
      region: { id: 1, name: 'Toshkent shahri' },
      district: { id: 1, name: 'Chilonzor tumani', region_id: 1 },
    },
    response: {
      client: {
        name: 'Karimov Aziz Bahromovich',
        birth_date: '1990-05-20',
        gender: 'Male',
        resident: 'Yes',
        address: 'Toshkent, Chilonzor',
        phone_number: '+998901234567',
        pinfl: '31205900500018',
        inn: '123456789',
        score_level: 'Good',
        score_date: '2024-03-01',
        document_type: 'Passport',
        document_serial: 'AB',
        document_number: '1234567',
        document_date: '2020-01-15',
        document_type_id: null,
        subject_id: null,
        credit_start_date: null,
      },
      score: {
        score_point: 720,
        score_class: 'A',
        score_level: 'Good',
        score_date: '2024-03-01',
        score_version: '2.0',
      },
      additional_info: {
        current_debt: {
          all_delays_qty: 0,
          all_delays_sum: 0,
          contracts_wo_delays_qty: 2,
          contracts_wo_delays_sum: 15000000,
          expired_percent_qty: 0,
          expired_percent_sum: 0,
          revised_contracts_qty: 0,
          revised_contracts_sum: 0,
          delays_less_30_qty: 0,
          delays_less_30_sum: 0,
          switched_month_qty: 0,
          switched_month_sum: 0,
          delays_less_60_qty: 0,
          delays_less_60_sum: 0,
          delays_less_90_qty: 0,
          delays_less_90_sum: 0,
          delays_more_90_qty: 0,
          delays_more_90_sum: 0,
          delays_in_court_qty: 0,
          delays_in_court_sum: 0,
          delays_decommissioned_qty: 0,
          delays_decommissioned_sum: 0,
          delays_decommissioned_pcnt_qty: 0,
          delays_decommissioned_pcnt_sum: 0,
        },
        closed_debt: {
          all_delays_qty: 1,
          all_delays_sum: 5000000,
          contracts_wo_delays_qty: 3,
          contracts_wo_delays_sum: 30000000,
          expired_percent_qty: 0,
          expired_percent_sum: 0,
          revised_contracts_qty: 0,
          revised_contracts_sum: 0,
          delays_less_30_qty: 1,
          delays_less_30_sum: 500000,
          switched_month_qty: 0,
          switched_month_sum: 0,
          delays_less_60_qty: 0,
          delays_less_60_sum: 0,
          delays_less_90_qty: 0,
          delays_less_90_sum: 0,
          delays_more_90_qty: 0,
          delays_more_90_sum: 0,
          delays_in_court_qty: 0,
          delays_in_court_sum: 0,
          delays_decommissioned_qty: 0,
          delays_decommissioned_sum: 0,
          delays_decommissioned_pcnt_qty: 0,
          delays_decommissioned_pcnt_sum: 0,
        },
        average_monthly_payment: '2500000',
        notifications: [],
      },
    },
    created_at: 1709337600,
    updated_at: 1709337600,
  },
]

// ==================== SCORING - Humo ====================

export const mockHumo = [
  {
    id: 1,
    status: 2,
    request: { number: 9860120195678, expiry: 2608 },
    response: {
      report: [
        {
          month: '2024-01',
          details: [
            { description: 'Pokupka', type_code: '00', amount: 250000 },
            { description: 'Perevod', type_code: '01', amount: 1500000 },
          ],
          full_amount: 1750000,
        },
        {
          month: '2024-02',
          details: [
            { description: 'Pokupka', type_code: '00', amount: 350000 },
            { description: 'Kommunalnie platezhi', type_code: '02', amount: 800000 },
          ],
          full_amount: 1150000,
        },
        {
          month: '2024-03',
          details: [{ description: 'Pokupka', type_code: '00', amount: 420000 }],
          full_amount: 420000,
        },
      ],
    },
    created_at: 1709337600,
    updated_at: 1709337600,
  },
]

// ==================== SCORING - Uzcard ====================

export const mockUzcard = [
  {
    id: 1,
    status: 2,
    request: { number: 8600140012345678, expiry: 2708 },
    response: {
      report: [
        {
          month: '2024-01',
          details: [
            { description: 'Pokupka', type_code: '00', amount: 500000 },
            { description: 'Perevod', type_code: '01', amount: 2000000 },
          ],
          full_amount: 2500000,
        },
        {
          month: '2024-02',
          details: [{ description: 'Pokupka', type_code: '00', amount: 180000 }],
          full_amount: 180000,
        },
      ],
    },
    created_at: 1709337600,
    updated_at: 1709337600,
  },
]

// ==================== SCORING - INPS History ====================

export const mockInpsHistory = [
  {
    id: 1,
    status: 2,
    request: {
      pinfl: 31205900500018,
      passport_series: 'AB',
      passport_number: '1234567',
      passport_given_date: '2020-01-15',
      first_name: 'Aziz',
      last_name: 'Karimov',
      middle_name: 'Bahromovich',
      phone: 998901234567,
      extra_phone: null,
      birth_date: '1990-05-20',
      region_id: 1,
      district_id: 1,
      region: { id: 1, name: 'Toshkent shahri' },
      district: { id: 1, name: 'Chilonzor tumani', region_id: 1 },
    },
    response: {
      incomes: {
        income: [
          {
            num: 1,
            orgname: 'Identity Biznes LLC',
            org_inn: '123456789',
            period: '2024-01',
            income_summa: '8000000',
            inps_summa: '960000',
            send_date: '2024-02-10',
          },
          {
            num: 2,
            orgname: 'Identity Biznes LLC',
            org_inn: '123456789',
            period: '2024-02',
            income_summa: '8000000',
            inps_summa: '960000',
            send_date: '2024-03-10',
          },
          {
            num: 3,
            orgname: 'Identity Biznes LLC',
            org_inn: '123456789',
            period: '2024-03',
            income_summa: '8500000',
            inps_summa: '1020000',
            send_date: '2024-04-10',
          },
        ],
      },
      incomes_period: {
        incomes_all_summa: '24500000',
        incomes_period_begin: '2024-01-01',
        incomes_period_end: '2024-03-31',
      },
      presence_reports: {
        presence_report: [
          { num: '1', presence: 'Present', report_name: '2024-01' },
          { num: '2', presence: 'Present', report_name: '2024-02' },
          { num: '3', presence: 'Present', report_name: '2024-03' },
        ],
      },
    },
    created_at: 1709337600,
    updated_at: 1709337600,
  },
]

// ==================== SCORING - Pension Info ====================

export const mockPensionInfo = [
  {
    id: 1,
    status: 2,
    request: {
      pinfl: 31205900500018,
      passport_series: 'AB',
      passport_number: '1234567',
      passport_given_date: '2020-01-15',
      first_name: 'Aziz',
      last_name: 'Karimov',
      middle_name: 'Bahromovich',
      phone: 998901234567,
      extra_phone: null,
      birth_date: '1990-05-20',
      region_id: 1,
      district_id: 1,
      region: { id: 1, name: 'Toshkent shahri' },
      district: { id: 1, name: 'Chilonzor tumani', region_id: 1 },
    },
    response: {
      result: 1,
      sizePension: {
        data: {
          address: 'Toshkent, Chilonzor tumani',
          apptype: 'Mehnat pensiyasi',
          datepay: '2024-01-15',
          datepens: '2050-05-20',
          document: 'AB 1234567',
          experience: '10 yil',
          namelatin: 'Aziz',
          patronymlatin: 'Bahromovich',
          pinpp: '31205900500018',
          summa: '2500000',
          surnamelatin: 'Karimov',
          type: 'Mehnat',
        },
        row: [
          { period: '2024-01', month: 'Yanvar', summa: 2500000 },
          { period: '2024-02', month: 'Fevral', summa: 2500000 },
          { period: '2024-03', month: 'Mart', summa: 2500000 },
        ],
      },
      comments: '',
    },
    created_at: 1709337600,
    updated_at: 1709337600,
  },
]

// ==================== SCORING - MIB ====================

export const mockMib = [
  {
    id: 1,
    status: 2,
    request: { pinfl: 31205900500018, phone: '+998901234567' },
    response: { debtBal: 0 },
    created_at: 1709337600,
    updated_at: 1709337600,
  },
  {
    id: 2,
    status: 2,
    request: { pinfl: 31503950300024, phone: '+998937654321' },
    response: { debtBal: 1500000 },
    created_at: 1709424000,
    updated_at: 1709424000,
  },
]

// ==================== SCORING - Tax ====================

export const mockTax = [
  {
    id: 1,
    status: 2,
    request: { pinfl: 31205900500018 },
    response: { debtBal: 0 },
    created_at: 1709337600,
    updated_at: 1709337600,
  },
  {
    id: 2,
    status: 2,
    request: { pinfl: 31503950300024 },
    response: { debtBal: 350000 },
    created_at: 1709424000,
    updated_at: 1709424000,
  },
]

// ==================== ACTIVITY LOGS ====================

export const mockLogs = [
  {
    id: 1,
    created_at: 1709337600,
    description: 'Yangi mijoz yaratildi',
    event: 'created',
    subject_type: 'Customer',
    subject_id: 1,
    user: {
      id: 1,
      username: 'admin',
      first_name: 'Admin',
      last_name: 'Identity Biznes',
      phone: '+998901234567',
      status: 1,
      avatar: { id: '', type: 0, preview_path: '', path: '', name: '', original_name: '', mime: '' },
    },
    properties: { attributes: { name: 'Aziz Karimov' }, old: { name: '' } },
  },
  {
    id: 2,
    created_at: 1709424000,
    description: 'Nasiya yaratildi',
    event: 'created',
    subject_type: 'Installment',
    subject_id: 1,
    user: {
      id: 1,
      username: 'admin',
      first_name: 'Admin',
      last_name: 'Identity Biznes',
      phone: '+998901234567',
      status: 1,
      avatar: { id: '', type: 0, preview_path: '', path: '', name: '', original_name: '', mime: '' },
    },
    properties: { attributes: { name: 'Telefon uchun nasiya' }, old: { name: '' } },
  },
  {
    id: 3,
    created_at: 1709510400,
    description: "To'lov qabul qilindi",
    event: 'updated',
    subject_type: 'Transaction',
    subject_id: 1,
    user: {
      id: 2,
      username: 'operator1',
      first_name: 'Sherzod',
      last_name: 'Aliyev',
      phone: '+998901112233',
      status: 1,
      avatar: { id: '', type: 0, preview_path: '', path: '', name: '', original_name: '', mime: '' },
    },
    properties: { attributes: { name: '1500000 sum' }, old: { name: '0' } },
  },
]

// ==================== CALCULATOR ====================

export function generateCalculatorResponse(amount: number, period: number, tariffId: number | string) {
  const tariff = mockTariffs.find((t) => t.id === Number(tariffId)) || mockTariffs[0]
  const monthlyRate = tariff.is_annual ? Number(tariff.percent) / 12 / 100 : Number(tariff.percent) / 100
  const result = []

  for (let i = 1; i <= period; i++) {
    const date = new Date()
    date.setMonth(date.getMonth() + i)
    const monthly = Math.round(amount / period + amount * monthlyRate)
    result.push({
      id: i,
      date: date.toISOString().split('T')[0],
      amount: Math.round(amount / period),
      portion: Math.round(amount * monthlyRate),
      monthly,
    })
  }
  return result
}

// ==================== PASSPORT INFO ====================

export const mockPassportInfo = {
  pinfl: 31205900500018,
  passport_series: 'AB',
  passport_number: '1234567',
  passport_given_date: '2020-01-15',
  first_name: 'Aziz',
  last_name: 'Karimov',
  middle_name: 'Bahromovich',
  phone: null,
  extra_phone: null,
  birth_date: '1990-05-20',
  region_id: 1,
  district_id: 1,
}
