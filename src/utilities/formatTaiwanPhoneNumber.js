export default function formatTaiwanPhoneNumber(phoneNumber) {
    const cleaned = `${phoneNumber}`.replace(/\D/g, '');
    if (cleaned.length !== 10) {
        return phoneNumber;
    }
    const formatted = cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
    return formatted;
}
