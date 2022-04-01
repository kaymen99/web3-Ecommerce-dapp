import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { ethers, utils } from "ethers"
import { create } from "ipfs-http-client"
import { Buffer } from "buffer"
import { useDispatch, useSelector } from "react-redux"
import { updateAccountData } from "../../features/blockchain"
import { Form, Button } from "react-bootstrap"
import { makeStyles, CircularProgress } from "@material-ui/core"


import AuctionContract from "../../artifacts/contracts/AuctionMarket.json";
import contractsAddress from "../../artifacts/deployments/map.json";
import networks from "../../utils/networksMap.json";


const ipfsClient = create("https://ipfs.infura.io:5001/api/v0")
const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/"
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const auctionContractAddress = contractsAddress["5777"]["AuctionMarket"][0]


const useStyles = makeStyles((theme) => ({
    Container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(2)
    }
}))

function CreateAuction() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [formInput, setFormInput] = useState({
        name: "",
        description: "",
        startPrice: 0,
        duration: 0
    })

    const [loading, setLoading] = useState(false)

    const data = useSelector((state) => state.blockchain.value)

    const classes = useStyles()

    const updateBalance = async () => {
        const signer = provider.getSigner()
        const balance = await signer.getBalance()
        dispatch(
            updateAccountData(
                { ...data, balance: utils.formatUnits(balance) }
            )
        )
    }

    // read uploaded file using FileReader and buffer
    const getProductImage = async (e) => {

        e.preventDefault()

        const reader = new window.FileReader();

        const file = e.target.files[0];

        if (file !== undefined) {
            reader.readAsArrayBuffer(file)

            reader.onloadend = () => {
                const buf = Buffer(reader.result, "base64")
                setImage(buf)
                setImagePreview(file)
            }
        }
    }

    const createNewAuction = async () => {
        if (image !== undefined) {
            try {
                setLoading(true)

                const signer = provider.getSigner()
                const auctionContract = new ethers.Contract(auctionContractAddress, AuctionContract.abi, signer);

                const addedFile = await ipfsClient.add(image)
                const imageURI = ipfsBaseUrl + addedFile.path

                const { name, description } = formInput
                if (!name || !description || !imageURI) return
                const data = JSON.stringify({
                    name, description, image: imageURI
                })

                const addedData = await ipfsClient.add(data)
                const descriptionURI = ipfsBaseUrl + addedData.path

                const duration = formInput.duration * 3600

                const add_tx = await auctionContract.startAuction(
                    descriptionURI,
                    utils.parseEther(String(formInput.price), "ether"),
                    duration
                )
                await add_tx.wait();

                setLoading(false)
                setImage(null)
                setFormInput({ name: "", description: "", price: 0, duration: 0 })

                navigate("/")
                updateBalance()
            }
            catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        else { return }
    }

    // ganache network is used for testing purposes 
    const currentNetwork = networks["1337"]
    const isGoodNet = data.network === currentNetwork
    const isConnected = data.account !== ""

    return (

        <>
            <div className="col-md-4 center" style={{ display: "inline-block", marginLeft: "35%" }}>

                {isConnected ? (
                    isGoodNet ? (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Auction name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength={30}
                                    placeholder="Enter auction name"
                                    onChange={(e) => { setFormInput({ ...formInput, name: e.target.value }) }} required />
                            </Form.Group>
                            <br />
                            <div>
                                <label>Auction Description: </label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    maxLength={200}
                                    placeholder="Enter auction description"
                                    onChange={(e) => { setFormInput({ ...formInput, description: e.target.value }) }}
                                    required />
                            </div>
                            <br />
                            <div>
                                <label>Auction start price: </label>
                                <Form.Control
                                    type="number"
                                    step="any"
                                    min="0"
                                    placeholder="Enter Auction price in $"
                                    onChange={e => setFormInput({ ...formInput, price: e.target.value })} required />
                            </div>
                            <br />
                            <br />
                            <div>
                                <label>Auction duration: </label>
                                <Form.Control
                                    type="number"
                                    step="any"
                                    min="0"
                                    placeholder="Enter Auction duration in hours"
                                    onChange={e => setFormInput({ ...formInput, duration: e.target.value })} required />
                            </div>
                            <br />
                            <div >
                                <Form.Control type="file" name="file" onChange={(e) => { getProductImage(e) }} />
                                <br />
                                {
                                    imagePreview && (
                                        <div className={classes.Container}>
                                            <img className="rounded mt-4"
                                                width="350"
                                                src={URL.createObjectURL(imagePreview)} />
                                        </div>
                                    )
                                }
                            </div>
                            <br />
                            <div className={classes.Container}>
                                <Button type="submit" variant="primary" onClick={createNewAuction}>
                                    {loading ? <CircularProgress size={26} color="#fff" /> : "Add"}
                                </Button>

                            </div>
                            <br />
                        </>
                    ) : (
                        <div className={classes.Container}>
                            You are on the wrong network switch to {currentNetwork} network
                        </div>
                    )
                ) : null}
            </div>
        </>
    );
}

export default CreateAuction
