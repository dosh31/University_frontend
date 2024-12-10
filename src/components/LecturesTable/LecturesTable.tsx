import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {formatDate} from "src/utils/utils.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {Button} from "reactstrap";
import {Lecture} from "src/api/Api.ts";
import {acceptLecture, fetchLectures, rejectLecture} from "store/slices/lecturesSlice.ts";

type Props = {
    lectures:Lecture[]
}

const LecturesTable = ({lectures}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (lecture_id) => {
        navigate(`/lectures/${lecture_id}`)
    }

    const handleAcceptLecture = async (lecture_id) => {
        await dispatch(acceptLecture(lecture_id))
        await dispatch(fetchLectures())
    }

    const handleRejectLecture = async (lecture_id) => {
        await dispatch(rejectLecture(lecture_id))
        await dispatch(fetchLectures())
    }

    const STATUSES = {
        1: "Черновик",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => STATUSES[value]
            },
            {
                Header: 'Аудитория',
                accessor: 'room',
                Cell: ({ value }) => value
            },
            {
                Header: 'Дата создания',
                accessor: 'date_created',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата формирования',
                accessor: 'date_formation',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата завершения',
                accessor: 'date_complete',
                Cell: ({ value }) => formatDate(value)
            }
        ],
        []
    )

    if (is_superuser) {
        columns.push(
            {
                Header: "Пользователь",
                accessor: "owner",
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "accept_button",
                Cell: ({ cell }) => (
                    cell.row.values.status == 2 && <Button color="primary" onClick={() => handleAcceptLecture(cell.row.values.id)}>Принять</Button>
                )
            },
            {
                Header: "Действие",
                accessor: "decline_button",
                Cell: ({ cell }) => (
                    cell.row.values.status == 2 && <Button color="danger" onClick={() => handleRejectLecture(cell.row.values.id)}>Отклонить</Button>
                )
            }
        )
    }

    return (
        <CustomTable columns={columns} data={lectures} onClick={handleClick}/>
    )
};

export default LecturesTable