import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteSpecialist,
    fetchSpecialist,
    removeSelectedSpecialist,
    updateSpecialist,
    updateSpecialistImage
} from "store/slices/specialistsSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const SpecialistEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {specialist} = useAppSelector((state) => state.specialists)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(specialist?.name)

    const [description, setDescription] = useState<string>(specialist?.description)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(specialist?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const saveSpecialist = async() => {
        if (imgFile != undefined) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updateSpecialistImage({
                specialist_id: specialist.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description
        }

        await dispatch(updateSpecialist({
            specialist_id: specialist.id,
            data
        }))

        navigate("/specialists-table/")
    }

    useEffect(() => {
        dispatch(fetchSpecialist(id))
        return () => dispatch(removeSelectedSpecialist())
    }, []);

    useEffect(() => {
        setName(specialist?.name)
        setDescription(specialist?.description)
        setImgURL(specialist?.image)
    }, [specialist]);

    const handleDeleteSpecialist = async () => {
        await dispatch(deleteSpecialist(id))
        navigate("/specialists-table/")
    }

    if (!specialist) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={saveSpecialist}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeleteSpecialist}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default SpecialistEditPage