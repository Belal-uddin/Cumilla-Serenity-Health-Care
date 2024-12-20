function redirectToAppointment(){

    // checking if the user is logged in or not
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if(token)
    {
        if(role === 'user'){
            window.location.href = '../Appointment/appointment.html';
        }else{
            alert('Only user can get appointment');
        }
    }else{
        window.location.href = '../Login/login.html';
    }
}