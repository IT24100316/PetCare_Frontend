export const BOARDING_DAILY_RATE = 3500;

export const BOARDING_MAX_CAPACITY = 20;

export const BOARDING_CARE_OPTIONS = [
  { key: 'meals', label: 'Meal plan', icon: 'restaurant-outline', note: 'Feeding schedule support' },
  { key: 'medication', label: 'Medication', icon: 'medkit-outline', note: 'Reminder and dose tracking' },
  { key: 'photoUpdates', label: 'Photo updates', icon: 'camera-outline', note: 'Daily check-in photos' },
];

export const BOARDING_CARE_LABELS = BOARDING_CARE_OPTIONS.reduce((labels, option) => ({
  ...labels,
  [option.key]: option.label,
}), {});

export const BOARDING_PREP_TIPS = [
  'Pack familiar food for the full stay.',
  'Add medication details before requesting approval.',
  'Bring a favorite blanket or toy for comfort.',
];

export const formatBoardingCurrency = (amount) => {
  if (!amount) return null;
  return `LKR ${Number(amount).toLocaleString()}`;
};
