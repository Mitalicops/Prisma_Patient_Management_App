import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

//async function hashPassword(password: string): Promise<string> {
  //const saltRounds = 10;
  //return bcrypt.hash(password, saltRounds);
//}

async function seedDoctors() {
  const doctors = [
    {
      name: "Dr. Alice Harper",
      email: "alice.harper@example.com",
      phone: "555-0101",
      specialization: "Cardiologist",
      hospitalAffiliation: "City General Hospital",
      licenseNumber: "DOC001",
      isAvailable: true,
      password: "SecurePass123!",
      gender: "Female",
      birthDate: new Date("1975-03-15"),
      address: "123 Heart Lane, Medcity",
      yearsOfExperience: 18,
      education: "MD, Harvard Medical School",
    },
    {
      name: "Dr. Benjamin Cole",
      email: "benjamin.cole@example.com",
      phone: "555-0102",
      specialization: "Surgeon",
      hospitalAffiliation: "St. Mary's Medical Center",
      licenseNumber: "DOC002",
      isAvailable: true,
      password: "Healing2025!",
      gender: "Male",
      birthDate: new Date("1980-07-22"),
      address: "456 Scalpel Rd, Healthtown",
      yearsOfExperience: 15,
      education: "MD, Johns Hopkins University",
    },
    {
      name: "Dr. Clara Nguyen",
      email: "clara.nguyen@example.com",
      phone: "555-0103",
      specialization: "Pediatrician",
      hospitalAffiliation: "Children’s Hope Hospital",
      licenseNumber: "DOC003",
      isAvailable: true,
      password: "KidsCare456!",
      gender: "Female",
      birthDate: new Date("1985-11-30"),
      address: "789 Tiny St, Careville",
      yearsOfExperience: 10,
      education: "MD, Stanford University School of Medicine",
    },
    {
      name: "Dr. David Patel",
      email: "david.patel@example.com",
      phone: "555-0104",
      specialization: "Neurologist",
      hospitalAffiliation: "Brain Trust Medical",
      licenseNumber: "DOC004",
      isAvailable: true,
      password: "NeuroPass789!",
      gender: "Male",
      birthDate: new Date("1978-02-10"),
      address: "101 Mind Ave, Thinktown",
      yearsOfExperience: 20,
      education: "MD, Yale School of Medicine",
    },
    {
      name: "Dr. Emma Sullivan",
      email: "emma.sullivan@example.com",
      phone: "555-0105",
      specialization: "Oncologist",
      hospitalAffiliation: "Hope Cancer Center",
      licenseNumber: "DOC005",
      password: "CureHope101!",
      gender: "Female",
      isAvailable: true,
      birthDate: new Date("1982-09-05"),
      address: "321 Cure Blvd, Lifecity",
      yearsOfExperience: 13,
      education: "MD, University of Pennsylvania",
    },
    {
      name: "Dr. Frank Ortiz",
      email: "frank.ortiz@example.com",
      phone: "555-0106",
      specialization: "Orthopedist",
      hospitalAffiliation: "Bone & Joint Clinic",
      isAvailable: true,
      licenseNumber: "DOC006",
      password: "BoneFix2025!",
      gender: "Male",
      birthDate: new Date("1970-12-25"),
      address: "654 Bone St, Movetown",
      yearsOfExperience: 25,
      education: "MD, Columbia University",
    },
    {
      name: "Dr. Grace Kim",
      email: "grace.kim@example.com",
      phone: "555-0107",
      specialization: "Dermatologist",
      hospitalAffiliation: "Skin Health Institute",
      licenseNumber: "DOC007",
      isAvailable: true,
      password: "SkinCare303!",
      gender: "Female",
      birthDate: new Date("1988-04-18"),
      address: "987 Skin Rd, Beautycity",
      yearsOfExperience: 8,
      education: "MD, UCLA David Geffen School of Medicine",
    },
  ];

  try {
    console.log("Seeding doctors...");
    for (const doctor of doctors) {
      await db.doctor.create({
        data: {
          name: doctor.name,
          email: doctor.email,
          phone: doctor.phone,
          specialization: doctor.specialization,
          hospitalAffiliation: doctor.hospitalAffiliation,
          isAvailable: true,
          licenseNumber: doctor.licenseNumber,
          password: doctor.password,
          gender: doctor.gender as "Male" | "Female" | "Other",
          birthDate: doctor.birthDate,
          address: doctor.address,
          yearsOfExperience: doctor.yearsOfExperience,
          education: doctor.education,
          role: "Doctor",
          emailVerified: new Date(),
          isTwoFactorEnabled: false,
        },
      });
      console.log(
        `Created doctor: ${doctor.name} with education: ${doctor.education}`
      );
    }
    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding doctors:", error);
  } finally {
    await db.$disconnect();
  }
}

seedDoctors();
