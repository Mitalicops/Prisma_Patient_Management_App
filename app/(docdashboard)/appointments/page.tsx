import { getDoctorAppointments } from '@/actions/doctor.actions';
import DoctorsAppointments from '@/components/DashboardUI/DoctorsAppointments'
import { currentUser } from '@/lib/auth';
import React from 'react'


const DoctorsAppointemntsPage = async () => {
    const TheDoc = await currentUser();
    const DocId = TheDoc?.id
    const Appointments = await getDoctorAppointments(DocId!);

    console.log({ Appointments });

  return (
    <div className='w-full h-screen rounded-md p-4 flex flex-col gap-4 max-sm:p-2 max-sm:gap-2'>
      <DoctorsAppointments TheAppointments={Appointments}/>
    </div>
  )
}

export default DoctorsAppointemntsPage