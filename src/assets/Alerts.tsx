import Swal from "sweetalert2";

const buttonStyleClass = Swal.mixin({
    customClass: {
        confirmButton: 'rounded-xl bg-[#002758] font-raleway text-white py-2 px-12 hover:bg-[#3C9AC5] hover:font-semibold transition duration-400',
        cancelButton: 'ml-12 rounded-xl bg-[#EE4452] font-raleway text-white py-2 px-12 hover:bg-[#FF2222] hover:font-semibold transition duration-400',
        title:'font-raleway',
        htmlContainer:'font-raleway',
    },
    buttonsStyling: false,
    confirmButtonText: "Continuar"
});

export const LoadingAlert = (title = "Cargando") => {
    Swal.fire({
        title: title,
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
    });
};

export const SuccessAlert = (title='¡Éxito!', text='') => buttonStyleClass.mixin({
    icon: "success",
    title: title,
    html: text,
    confirmButtonText: 'Continuar',
    customClass:{
        confirmButton: 'rounded-xl bg-[#EE4452] font-raleway text-white py-1 px-8 hover:bg-[#FF2222] transition duration-300',
    }
});

export const ErrorAlert = (text: string, buttonText: string) => buttonStyleClass.mixin({
    icon: "error",
    title: "Error",
    html: text,
    confirmButtonText: buttonText,
    customClass:{
        confirmButton: 'rounded-xl bg-[#EE4452] text-white py-1 px-8 hover:bg-[#FF2222] transition duration-300',
    }
});

export const ConfirmationAlert = (title = '¿Está Seguro?', text = "") => buttonStyleClass.mixin({
    icon: "warning",
    title: title,
    html: text,
    showCancelButton: true,
    cancelButtonText: "Cancelar"
});