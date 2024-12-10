import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Specialist} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteSpecialist} from "store/slices/specialistsSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    specialists:T_Specialist[]
}

const SpecialistsTable = ({specialists}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (specialist_id) => {
        navigate(`/specialists/${specialist_id}`)
    }

    const openpRroductEditPage = (specialist_id) => {
        navigate(`/specialists/${specialist_id}/edit`)
    }

    const handleDeleteSpecialist = async (specialist_id) => {
        dispatch(deleteSpecialist(specialist_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Цена',
                accessor: 'price',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openpRroductEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteSpecialist(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!specialists.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={specialists} onClick={handleClick} />
    )
};

export default SpecialistsTable