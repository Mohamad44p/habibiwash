import { BookingData } from "@/components/booking/BookingFlow";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Preview,
  Section,
  Row,
  Column,
  Heading,
  Img,
} from "@react-email/components";
import { format } from "date-fns";

interface BookingConfirmationEmailProps {
  booking: BookingData;
  totalPrice: number;
  isAdminNotification?: boolean;
}

export default function BookingConfirmationEmail({
  booking,
  totalPrice,
  isAdminNotification = false,
}: BookingConfirmationEmailProps) {
  // Get base package price and info
  const selectedPackage = booking.selectedPackage;
  const selectedSubPackage = selectedPackage?.subPackages.find(
    (sp) => sp.id === booking.selectedSubPackage
  );
  const basePrice =
    selectedSubPackage?.prices.find(
      (p) => p.vehicleType.toLowerCase() === booking.vehicleType?.toLowerCase()
    )?.price || 0;

  // Get selected add-ons with prices
  const selectedAddOns = (booking.selectedPackage?.addOns || [])
    .filter((addon) => booking.selectedAddOns?.includes(addon.id))
    .map((addon) => ({
      id: addon.id,
      name: addon.name,
      price: addon.price,
    }));

  // Calculate add-ons total
  const addOnsTotal = selectedAddOns.reduce(
    (total, addon) => total + addon.price,
    0
  );

  return (
    <Html>
      <Head />
      <Preview>
        {isAdminNotification
          ? "New Booking Received - HabibiWash"
          : "Your car wash booking confirmation from HabibiWash"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src="https://www.habibiwash.com/_next/image?url=%2Fhabibi.png&w=256&q=75"
              width="200"
              height="67"
              alt="HabibiWash Logo"
              style={logo}
            />
          </Section>

          <Heading style={header}>
            {isAdminNotification
              ? "New Booking Received"
              : "Booking Confirmation"}
          </Heading>

          {isAdminNotification && (
            <Section style={section}>
              <Text style={value}>
                A new booking has been received from{" "}
                {booking.customerInfo?.name}.
              </Text>
            </Section>
          )}

          <Section style={section}>
            <Row style={row}>
              <Column>
                <Text style={label}>Package Details</Text>
                <Text style={value}>
                  {selectedPackage?.name}
                  {selectedSubPackage && ` - ${selectedSubPackage.name}`}
                </Text>
                <Text style={subValue}>
                  Base Price: ${basePrice.toFixed(2)}
                </Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column>
                <Text style={label}>Appointment Time</Text>
                <Text style={value}>
                  {booking.selectedDate &&
                    format(booking.selectedDate, "EEEE, MMMM d, yyyy")}
                </Text>
                <Text style={subValue}>{booking.selectedTime}</Text>
              </Column>
            </Row>

            <Row style={row}>
              <Column>
                <Text style={label}>Vehicle Type</Text>
                <Text
                  style={{ ...value, textTransform: "capitalize" as const }}
                >
                  {booking.vehicleType}
                </Text>
              </Column>
            </Row>

            {selectedAddOns.length > 0 && (
              <Row style={row}>
                <Column>
                  <Text style={label}>Selected Add-ons</Text>
                  <div style={addonsContainer}>
                    {selectedAddOns.map(
                      (addon) =>
                        addon && (
                          <Text key={addon.id} style={addonItem}>
                            <span style={addonName}>• {addon.name}</span>
                            <span style={addonPrice}>
                              ${addon.price.toFixed(2)}
                            </span>
                          </Text>
                        )
                    )}
                  </div>
                </Column>
              </Row>
            )}

            <Row style={priceBreakdownContainer}>
              <Column>
                <Text style={summaryHeader}>Price Summary</Text>
                <div style={priceGrid}>
                  <Text style={summaryItem}>Base Package:</Text>
                  <Text style={summaryPrice}>${basePrice.toFixed(2)}</Text>

                  {selectedAddOns.length > 0 && (
                    <>
                      <Text style={summaryItem}>Add-ons Total:</Text>
                      <Text style={summaryPrice}>
                        ${addOnsTotal.toFixed(2)}
                      </Text>

                      <Text style={summaryItem}>Add-ons Detail:</Text>
                      <div style={addonsList}>
                        {selectedAddOns.map((addon) => (
                          <Text key={addon.id} style={addonDetail}>
                            {addon.name}: ${addon.price.toFixed(2)}
                          </Text>
                        ))}
                      </div>
                    </>
                  )}

                  <Text style={totalLabel}>Total Amount:</Text>
                  <Text style={totalPriceStyle}>${totalPrice.toFixed(2)}</Text>
                </div>
              </Column>
            </Row>
          </Section>

          <Section style={section}>
            <Text style={sectionHeaderStyle}>Customer Information</Text>
            <div style={customerInfoStyle}>
              <Text style={value}>{booking.customerInfo?.name}</Text>
              <Text style={value}>{booking.customerInfo?.email}</Text>
              <Text style={value}>{booking.customerInfo?.phone}</Text>
              {booking.customerInfo?.notes && (
                <Text style={notes}>{booking.customerInfo.notes}</Text>
              )}
            </div>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>Thank you for choosing HabibiWash!</Text>
            <Text style={contactText}>
              Need to make changes? Contact us at:
              <br />
              Email: habibiwash99@gmail.com
              <br />
              Phone: +1 (945)-309-0185
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Update and add new styles
const main = {
  backgroundColor: "#f8fafc",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 0",
  maxWidth: "600px",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const logoSection = {
  textAlign: "center" as const,
  padding: "20px 0 40px",
  borderBottom: "1px solid #e6ebf1",
};

const logo = {
  margin: "0 auto",
};

const section = {
  padding: "32px",
  borderBottom: "1px solid #e6ebf1",
};

const header = {
  fontSize: "28px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#1a1a1a",
  padding: "0 32px",
  textAlign: "center" as const,
  marginBottom: "32px",
};

const row = {
  marginBottom: "16px",
};

const label = {
  color: "#666666",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  marginBottom: "4px",
  fontWeight: "600",
};

const value = {
  fontSize: "16px",
  color: "#1a1a1a",
  marginBottom: "4px",
};

const subValue = {
  fontSize: "14px",
  color: "#666666",
  marginBottom: "8px",
};
const notes = {
  fontSize: "14px",
  color: "#666666",
  fontStyle: "italic",
  margin: "16px 0",
  padding: "12px",
  backgroundColor: "#f8f8f8",
  borderRadius: "4px",
};

const footer = {
  padding: "32px",
};

const footerText = {
  fontSize: "14px",
  color: "#666666",
  lineHeight: "1.5",
  textAlign: "center" as const,
};

const addonsContainer = {
  padding: "8px 0",
};

const addonItem = {
  ...value,
  padding: "4px 0",
  display: "flex",
  justifyContent: "space-between",
};

const addonPrice = {
  fontWeight: "500",
};

const priceBreakdownContainer = {
  marginTop: "32px",
  padding: "24px",
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
};

const summaryHeader = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#0f172a",
  marginBottom: "16px",
};

const priceGrid = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "8px",
  fontSize: "15px",
};

const summaryItem = {
  color: "#475569",
};

const summaryPrice = {
  color: "#0f172a",
  textAlign: "right" as const,
};

const totalLabel = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#0f172a",
  borderTop: "2px solid #e2e8f0",
  paddingTop: "12px",
  marginTop: "8px",
};

const sectionHeaderStyle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1a1a1a",
  marginBottom: "16px",
};

const customerInfoStyle = {
  padding: "16px 0",
};

const totalPriceStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#0f172a",
  borderTop: "2px solid #e2e8f0",
  paddingTop: "12px",
  marginTop: "8px",
  textAlign: "right" as const,
};

const contactText = {
  ...footerText,
  marginTop: "16px",
  padding: "16px",
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  lineHeight: "1.8",
};

const addonName = {
  flex: 1,
};

const addonDetail = {
  fontSize: "13px",
  color: "#666666",
  marginLeft: "12px",
  marginBottom: "4px",
};

const addonsList = {
  gridColumn: "1 / -1",
  margin: "8px 0",
  padding: "8px 0",
  borderTop: "1px dashed #e2e8f0",
  borderBottom: "1px dashed #e2e8f0",
};
