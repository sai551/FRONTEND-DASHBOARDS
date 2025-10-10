


import ProfileCard from "@/components/ProfileCard";

export default function MyProfilePage() {
  return (
    <ProfileCard
      profileImage="/image.jpg" // ✅ from public folder
      employee={{
        employeeId: "CAML0014",
        firstName: "HR",
        lastName: "Camelq",
        email: "hr@gmail.com",
        phone: "+91 98765 43210",
        role: "Software Engineer",
        designation: "Software Engineer",
        department: "Engineering",
        branch: "Hyderabad, Telangana, India",
        doj: "12th August 2020",
        status: "Active",
        employmentType: "Full-time",
        work_shift: "Day",
        profilePhoto: "/image.jpg",
      }}
      personal={{
        address: "123 MG Road",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        pincode: "500081",
        emergency_contact_name: "John Camel",
        emergency_contact_relation: "Brother",
        emergency_contact_number: "+91 98765 00000",
        aadhaarNumber: "1234-5678-9012",
        panNumber: "ABCDE1234F",
        licenseNumber: "DL1234567890",
        passportNumber: "P1234567",
        marrital_status: "Single",
        bloodGroup: "O+",
        dob: "20th March 1995",
        gender: "Male",
        nationality: "Indian",
      }}
      bank={{
        bank_name: "State Bank of India",
        accountNumber: "123456789012",
        ifsc_code: "SBIN0001234",
        branch_name: "MG Road Branch",
      }}
      pf={{
        uan_number: "100200300400",
        pf_number: "PF1234567890",
        esi_number: "ESI0987654321",
        nominee_name: "Jane Camel",
        nominee_relation: "Sister",
      }}
      stats={{
        projects: 15,
        hires: "250+",
        rating: "96%",
        years: 5,
      }}
      onChangePhoto={() => alert("Change photo clicked")}
    />
  );
}
