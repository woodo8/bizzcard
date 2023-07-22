import React, { useEffect, useState } from 'react'
import "./createPortfolio.css"
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import { useCreateNewPortfolioMutation, useDeletePortfolioMutation, useGetAllPortfoliosQuery } from '../../services/cardsApi';
import { useParams } from 'react-router';

export default function CreatePortfolio({ showAdd }: any) {

    const { id: id } = useParams();
    const [name, setName] = useState<string>("");
    const [url, setUrl] = useState<string>("https://");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<any>();
    const [portfolioData, setPortfolioData] = useState<any>([])

    const [newPortfolio, result] = useCreateNewPortfolioMutation();
    const { data, error, isError, isLoading, isSuccess } = result;

    const { data: dataGet, error: errorGet, isLoading: isLoadingGet, isSuccess: isSuccessGet, isError: isErrorGet, refetch } = useGetAllPortfoliosQuery(id);

    const [deletePortfolio, resultDelete] = useDeletePortfolioMutation();

    // url validator
    const isValidUrl = (urlString: any) => {
        try {
            return Boolean(new URL(urlString));
        }
        catch (e) {
            return false;
        }
    }

    const handleSubmit = async () => {
        try {
            if (!name) {
                return alert("Please at least add name and image!")
            }
            if (url && url !== "https://" && !isValidUrl(url)) {
                return alert("Please add valid url!")
            }
            if (!image || !image.img) {
                return alert("You have to add image")
            }
            const token = localStorage.getItem("token")
            let formData = new FormData();
            // @ts-ignore


            formData.append("name", name);
            description && formData.append("description", description);
            url !== "https://" && url && formData.append("url", url);
            formData.append("image", image.img);

            let response = await newPortfolio({ token: token, body: formData, id: id });
            if (response && 'data' in response) {
                setPortfolioData([...portfolioData, response.data])
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        if (isError) {
            alert("something went wrong. Please try again later!");
        }
        if (isSuccess) {
            alert("Portfolio added successfully!");
            setName("");
            setUrl("");
            setDescription("");
            (async function () { await refetch() })();
            // refetch();
        }
    }, [isLoading])

    useEffect(() => {
        if (isErrorGet) {
            alert("something went wrong. Please try again later!");
        }
        if (isSuccessGet) {
            setPortfolioData(dataGet)
            // alert("Portfolio added successfully!");
        }
    }, [isLoadingGet, isLoading])

    const handleDelete = async (e: any, pId: string) => {
        let bool = window.confirm("Are you sure to delete this item?!")
        if (bool) {
            const token = localStorage.getItem("token")
            let response = await deletePortfolio({ id: pId, token: token });
            if (response && 'data' in response) {
                let filteredArray = portfolioData.filter((item: any) => item._id !== pId)
                setPortfolioData(filteredArray)
            }
        }
    }

    useEffect(() => {
        if (resultDelete.isError) {
            alert("something went wrong. Please try again later!");
        }
        if (resultDelete.isSuccess) {
            // setPortfolioData(dataGet)
            alert("Portfolio deleted successfully!");
        }
    }, [resultDelete.isLoading])


    return (
        <div className='createPortfolio contactInfo'>
            {
                showAdd &&
                <div>
                    <TextField
                        label="Name"
                        type="text"
                        variant="filled"
                        className='input'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={true}
                    />
                    <TextField
                        label="Url"
                        type="text"
                        variant="filled"
                        className='input'
                        placeholder='Url'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Some things about this'
                        className='serviceTextarea' name="description"
                        value={description}
                        id="description"
                    ></textarea>
                    <div className='bgImageBox' >
                        <label htmlFor='bgImg' >
                            <div className="imageBox d-flex align-center">
                                {image && image.img ? <img className='image' src={image.preViews} alt=".." /> : <div className="image"></div>}
                                <div>
                                    <Typography variant='h6'>Фотография фона</Typography>
                                    <Typography variant='h5'>Файл Ещё не выбран </Typography>
                                </div>
                            </div>
                            <Typography variant="h2" className=' d-flex align-center'>
                                <UploadFileOutlinedIcon className='uploadIcon' />
                                Загрузить изображение
                            </Typography>
                        </label>
                        <input
                            id="bgImg"
                            onChange={(e) => {
                                // @ts-ignore: Object is possibly 'null'.
                                if (e.target.files.length !== 0) {
                                    setImage({
                                        // @ts-ignore: Object is possibly 'null'.
                                        img: e.target.files[0],
                                        // @ts-ignore: Object is possibly 'null'.
                                        preViews: URL.createObjectURL(e.target.files[0]),
                                    })
                                }
                            }}
                            type="file" />
                    </div>
                    <Button
                        onClick={handleSubmit} disabled={isLoading ? true : false}
                        className='submitBtn'>
                        {isLoading && <CircularProgress color='inherit' style={{ width: "20px", height: "20px", marginRight: "15px" }} />}
                        Добавить в базу данных
                    </Button>
                </div>
            }

            <div className='items'>
                <h1 className='panelHeading'>Существующие элементы</h1>
                {
                    portfolioData.length !== 0 && portfolioData.map((item: any, index: any) => (
                        <div key={index} className="portfolioItem">
                            <div className='d-flex align-start justify-between'>
                                {item.image && <img src={item.image} alt="" />}
                                <Typography onClick={(e: any) => handleDelete(e, item._id)} style={{ color: "red", cursor: "pointer" }}>
                                    Delete
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="h5">{item.name}</Typography>
                                {

                                    item.description &&
                                    <Typography>
                                        {item.description.length > 80 ?
                                            (item.description.substr(0, 80) + "...")
                                            : item.description}
                                        {/* {item.description.length > 80 && <span onClick={} style={{ textDecoration: "underline" }}>more</span>} */}
                                    </Typography>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}
