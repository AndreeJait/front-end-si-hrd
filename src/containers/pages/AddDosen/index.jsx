    import axios from 'axios';
import React, { Component } from 'react';
// import { confirmAlert } from 'react-confirm-alert'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading';
import './index.css';
import SelectMethod from '../../../components/organisms/SelectMethod';
import AboutMethod from '../../../components/organisms/AboutMethod';
import ImportExcel from '../../../components/organisms/ImportExcel';
import DataDiri from '../../../components/organisms/DataDiri';
import DataPegawai from '../../../components/organisms/DataPegawai';
import DataPajak from '../../../components/organisms/DataPajak';
import DataKontrak from '../../../components/organisms/DataKontrak';
import DataMasaKerja from '../../../components/organisms/DataMasaKerja';
import DataUnpaid from '../../../components/organisms/DataUnpaid';
import DataChilds from '../../../components/organisms/DataChilds';
import DataPembayaran from '../../../components/organisms/DataPembayaran';
import DataJabatan from '../../../components/organisms/DataJabatan';
import DataPangkat from '../../../components/organisms/DataPangkat';
import DataPendidikan from '../../../components/organisms/DataPendidikan';
import DataSertifikasi from '../../../components/organisms/DataSertifikasi';
import Lampiran from '../../../components/organisms/Lampiran';
import { actionaddDataPegawaiAPI, actionUpdateEmployee } from '../../../config/redux/action';
class AddDosen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            provinsi: [],
            stage: 0,
            page: 1,
            child_page: 1,
            method: 0,
            success: 0,
            dosen: {
                "certifications": {
                    "nomor_sertifikasi": "",
                    "tanggal_sertifikasi": ""
                },
                "private_data": {
                    "nip": "",
                    "nidn": "",
                    "nama": "",
                    "bpjs_kesehatan": "",
                    "bpjs_ketenagakerjaan": "",
                    "status_nikah": "",
                    "nama_pasangan": "",
                    "tempat_lahir_pasangan": "",
                    "tanggal_lahir_pasangan": "",
                    "alamat": "",
                    "kelurahan": "",
                    "kecamatan": "",
                    "kabupaten": "",
                    "provinsi": "",
                    "kode_pos": "",
                    "telepon": "",
                    "no_hp": "",
                    "email": "",
                    "jenis_kelamin": "",
                    "tanggal_lahir": "",
                    "tempat_lahir": "",
                    "agama": "",
                    "no_ktp": "",
                    "foto_diri": ""
                },
                "detail_employee": {
                    "kode": "",
                    "klasifikasi": "",
                    "tanggal_masuk": "",
                    "tanggal_keluar": "",
                    "status": ""
                },
                "tax_details": [

                ],
                "contrats": [

                ],
                "years_of_service": [
                ],
                "unpaid_history": [

                ],
                "childs": [

                ],
                "payment": {
                    "bank_transfer": "",
                    "cabang": "",
                    "account_holder": "",
                    "no_rekening": ""
                },
                "positions": [
                ],
                "ratings": [
                ],
                "lampiran": [],
                "education_histories": [],
            },
            show: [],
        }
        this.menu = [
            [
                ["no", "fas fa-clipboard-check", "select method", 1, 0],
                ["no", "fas fa-info-circle", "About method", 2, 0]
            ],
            [
                ["no", "fas fa-file-import", "Import data", 1, 1],
                ["no", "fas fa-arrow-left", "Kembali", 1, 0]
            ],
            [
                ["yes", "fas fa-users", "text", 1, 2,
                    [
                        ["", "Data Diri", 1],
                        ["", "Data Pegawai", 2],
                        ["", "Data Pajak", 3],
                        ["", "Data Kontrak", 4],
                        ["", "Data Masa Kerja", 5],
                        ["", "Data Unpaid", 6],
                        ["", "Data Anak", 7],
                        ["", "Data Pembayaran", 8],
                        ["", "Data Jabatan", 9],
                        ["", "Data Golongan/Pangkat", 10],
                        ["", "Data Sertifikasi", 11],
                        ["", "Data Pendidikan", 12],
                    ]
                ],
                ["no", "fas fa-paperclip", "Lampiran", 2, 2],
                ["no", "fas fa-arrow-left", "Kembali", 1, 0]
            ]
        ]
        this.source = axios.CancelToken.source()
    }
    componentDidMount() {
        if (localStorage.getItem("last_inserted")){
            this.setState({
                dosen: JSON.parse(localStorage.getItem("last_inserted")),
                stage:2,
                page: 1,
                method: 2,
                show: this.menu[2]
            })
        }else{
            this.setState({
                show: this.menu[this.state.stage]
            })
        }
    }
    componentWillUnmount() {
        this.source.cancel()
    }

    handleChangePrivatedata = (event) => {
        let private_data = this.state.dosen.private_data;
        if (event.target.name.includes("tanggal") || event.target.name.includes("tmt")) {
            private_data[event.target.name] = (new Date(event.target.value)).getTime();
        } else {
            private_data[event.target.name] = event.target.value;
        }
        let dosen = this.state.dosen;
        dosen.private_data = private_data
        this.setState({
            dosen: dosen
        });
    }
    handleChangePayment = (event) => {
        let detail_bank = this.state.dosen.payment;
        if (event.target.name.includes("tanggal") || event.target.name.includes("tmt")) {
            detail_bank[event.target.name] = (new Date(event.target.value)).getTime();
        } else {
            detail_bank[event.target.name] = event.target.value;
        }
        let dosen = this.state.dosen;
        dosen.payment = detail_bank
        this.setState({
            dosen: dosen
        });
    }
    handleChangeSertifikasi = (event) => {
        let detail_sertifikasi = this.state.dosen.certifications;
        if (event.target.name.includes("tanggal") || event.target.name.includes("tmt")) {
            detail_sertifikasi[event.target.name] = (new Date(event.target.value)).getTime();
        } else {
            detail_sertifikasi[event.target.name] = event.target.value;
        }
        let dosen = this.state.dosen;
        dosen.certifications = detail_sertifikasi
        this.setState({
            dosen: dosen
        });
    }
    handleChangeEmployee = (event) => {
        let employee = this.state.dosen.detail_employee;
        if (event.target.name.includes("tanggal") || event.target.name.includes("tmt")) {
            employee[event.target.name] = (new Date(event.target.value)).getTime();
        } else {
            employee[event.target.name] = event.target.value;
        }
        let dosen = this.state.dosen;
        dosen.detail_employee = employee
        this.setState({
            dosen: dosen
        });
    }
    handleAddPajak = (event) => {
        let new_pajak = {
            "status_pajak": "",
            "npwp": "",
            "tanggal_npwp": "",
            "alamat_npwp": "",
        };
        let tax = this.state.dosen.tax_details;
        tax.push(new_pajak);
        let dosen = this.state.dosen
        dosen.tax_details = tax
        this.setState({
            dosen: dosen
        })
    }

    handleOnChangePajak = (event) => {
        let index = Number(event.target.getAttribute("data-temp"));
        let tax = this.state.dosen.tax_details;
        if (event.target.name.includes("tanggal")) {
            tax[index][event.target.name] = (new Date(event.target.value)).getTime()
        } else {
            tax[index][event.target.name] = event.target.value
        }
        let dosen = this.state.dosen
        dosen.tax_details = tax
        this.setState({
            dosen: dosen
        })
    }

    handleOnDeletePajak = (event) => {
        let index = event.target.getAttribute("data-index")
        let tax = this.state.dosen.tax_details
        tax.splice(index, 1);
        let dosen = this.state.dosen
        dosen.tax_details = tax
        this.setState({
            dosen: dosen
        })
    }

    handleAddKontrak = (event) => {
        let new_kontrak = {
            "tanggal_mulai": "",
            "tanggal_berakhir": "",
            "keterangan": ""
        };
        let contrats = this.state.dosen.contrats;
        contrats.push(new_kontrak);
        let dosen = this.state.dosen
        dosen.contrats = contrats
        this.setState({
            dosen: dosen
        })
    }

    handleOnChangeKontrak = (event) => {
        let index = Number(event.target.getAttribute("data-temp"));
        let contrats = this.state.dosen.contrats;
        if (event.target.name.includes("tanggal")) {
            contrats[index][event.target.name] = (new Date(event.target.value)).getTime()
        } else {
            contrats[index][event.target.name] = event.target.value
        }
        let dosen = this.state.dosen
        dosen.contrats = contrats
        this.setState({
            dosen: dosen
        })
    }

    handleOnDeleteKontrak = (event) => {
        let index = event.target.getAttribute("data-index")
        let contrats = this.state.dosen.contrats
        contrats.splice(index, 1);
        let dosen = this.state.dosen
        dosen.contrats = contrats
        this.setState({
            dosen: dosen
        })
    }
    handleAddMasaKerja = (event) => {
        let new_masa_kerja = {
            "tanggal_masuk": "",
            "masa_kerja": "",
            "aktif_tsdp": "",
            "keterangan": ""
        };
        let masa_kerja = this.state.dosen.years_of_service;
        masa_kerja.push(new_masa_kerja);
        let dosen = this.state.dosen
        dosen.years_of_service = masa_kerja
        this.setState({
            dosen: dosen
        })
    }

    handleOnChangeMasaKerja = (event) => {
        let index = Number(event.target.getAttribute("data-temp"));
        let masa_kerja = this.state.dosen.years_of_service;
        if (event.target.name.includes("tanggal")) {
            masa_kerja[index][event.target.name] = (new Date(event.target.value)).getTime()
        } else {
            masa_kerja[index][event.target.name] = event.target.value
        }
        let dosen = this.state.dosen
        dosen.years_of_service = masa_kerja
        this.setState({
            dosen: dosen
        })
    }

    handleOnDeleteMasaKerja = (event) => {
        let index = event.target.getAttribute("data-index")
        let masa_kerja = this.state.dosen.years_of_service
        masa_kerja.splice(index, 1);
        let dosen = this.state.dosen
        dosen.years_of_service = masa_kerja
        this.setState({
            dosen: dosen
        })
    }
    handleAddUnpaid = (event) => {
        let new_unpaid = {
            "jumlah_hari": "",
            "awal_unpaid": "",
            "akhir_unpaid": ""
        };
        let upaid = this.state.dosen.unpaid_history;
        upaid.push(new_unpaid);
        let dosen = this.state.dosen
        dosen.unpaid_history = upaid
        this.setState({
            dosen: dosen
        })
    }

    handleOnChangeUnpaid = (event) => {
        let index = Number(event.target.getAttribute("data-temp"));
        let unpaid = this.state.dosen.unpaid_history;
        if (event.target.name.includes("tanggal")) {
            unpaid[index][event.target.name] = (new Date(event.target.value)).getTime()
        } else {
            unpaid[index][event.target.name] = event.target.value
        }
        let dosen = this.state.dosen
        dosen.unpaid_history = unpaid
        this.setState({
            dosen: dosen
        })
    }

    handleOnDeleteUnpaid = (event) => {
        let index = event.target.getAttribute("data-index")
        let unpaid = this.state.dosen.unpaid_history
        unpaid.splice(index, 1);
        let dosen = this.state.dosen
        dosen.unpaid_history = unpaid
        this.setState({
            dosen: dosen
        })
    }
    handleAddPostion = (event) => {
        let new_postion = {
            "jabatan_struktural": "",
            "jabatan_fungsional": "",
            "no_sk_jabatan_fungsional": "",
            "jfd_kum": "",
            "tmt": ""
        };
        let positions = this.state.dosen.positions;
        positions.push(new_postion);
        let dosen = this.state.dosen
        dosen.positions = positions
        this.setState({
            dosen: dosen
        })
    }

    handleOnChangePostion = (event) => {
        let index = Number(event.target.getAttribute("data-temp"));
        let position = this.state.dosen.positions;
        if (event.target.name.includes("tanggal")) {
            position[index][event.target.name] = (new Date(event.target.value)).getTime()
        } else {
            position[index][event.target.name] = event.target.value
        }
        let dosen = this.state.dosen
        dosen.positions = position
        this.setState({
            dosen: dosen
        })
    }

    handleOnDeletePostion = (event) => {
        let index = event.target.getAttribute("data-index")
        let postion = this.state.dosen.positions
        postion.splice(index, 1);
        let dosen = this.state.dosen
        dosen.positions = postion
        this.setState({
            dosen: dosen
        })
    }
    handleAddRatings = (event) => {
        let new_ratings = {
            "no_sk_inpassing": "",
            "pangkat_inpassing": "",
            "golongan": "",
            "tmt": ""
        };
        let ratings = this.state.dosen.ratings;
        ratings.push(new_ratings);
        let dosen = this.state.dosen
        dosen.ratings = ratings
        this.setState({
            dosen: dosen
        })
    }
    handleSendData = async (event) => {
        if (localStorage.getItem("last_inserted")) {
            this.setState({
                success: 0
            });
            this.props.updatePegawai({employee: this.state.dosen}, this.source.token)
                .then(result=>{
                    alert("Berhasil mengubah data.")
                    localStorage.setItem("last_inserted", JSON.stringify(this.state.dosen));
                    this.setState({
                        success: 1
                    });
                }).catch(err=>{
                    this.source = axios.CancelToken.source()
                    alert("Failed to update data.");
                    this.setState({
                        success: -1
                    });
                })
        } else {
            this.setState({
                success: 0
            });
            this.props.addPegawai([this.state.dosen], this.source.token)
                .then(result => {
                    alert("Berhasil menyimpan data.")
                    localStorage.setItem("last_inserted", JSON.stringify(result.result[0]));
                    this.setState({
                        dosen: result.result[0],
                        success: 1
                    });
                    this.source = axios.CancelToken.source()
                }).catch(err => {
                    this.source = axios.CancelToken.source()
                    alert("Failed to add data.");
                    this.setState({
                        success: -1
                    });
                })
        }
    }
    handleOnChangeRatings = (event) => {
        let index = Number(event.target.getAttribute("data-temp"));
        let rating = this.state.dosen.ratings;
        if (event.target.name.includes("tanggal")) {
            rating[index][event.target.name] = (new Date(event.target.value)).getTime()
        } else {
            rating[index][event.target.name] = event.target.value
        }
        let dosen = this.state.dosen
        dosen.ratings = rating
        this.setState({
            dosen: dosen
        })
    }

    handleOnDeleteRatings = (event) => {
        let index = event.target.getAttribute("data-index")
        let rating = this.state.dosen.ratings
        rating.splice(index, 1);
        let dosen = this.state.dosen
        dosen.ratings = rating
        this.setState({
            dosen: dosen
        })
    }

    handleAddChilds = (event) => {
        let new_childs = {
            "nama_anak": "",
            "tempat_lahir_anak": "",
            "tanggal_lahir_anak": ""
        };
        let child = this.state.dosen.childs;
        child.push(new_childs);
        let dosen = this.state.dosen
        dosen.childs = child
        this.setState({
            dosen: dosen
        })
    }

    handleOnChangeChilds = (event) => {
        let index = Number(event.target.getAttribute("data-temp"));
        let child = this.state.dosen.childs;
        if (event.target.name.includes("tanggal")) {
            child[index][event.target.name] = (new Date(event.target.value)).getTime()
        } else {
            child[index][event.target.name] = event.target.value
        }
        let dosen = this.state.dosen
        dosen.childs = child
        this.setState({
            dosen: dosen
        })
    }

    handleOnDeleteChilds = (event) => {
        let index = event.target.getAttribute("data-index")
        let child = this.state.dosen.childs
        child.splice(index, 1);
        let dosen = this.state.dosen
        dosen.childs = child
        this.setState({
            dosen: dosen
        })
    }
    handleAddEducations = (event) => {
        let new_education = {
            "tanggal_berakhir": "",
            "nilai": "",
            "jurusan": "",
            "instansi": "",
            "nama_pendidikan": "",
            "tanggal_masuk": ""
        };
        let education = this.state.dosen.education_histories;
        education.push(new_education);
        let dosen = this.state.dosen
        dosen.education_histories = education
        this.setState({
            dosen: dosen
        })
    }

    handleOnChangeEducations = (event) => {
        let index = Number(event.target.getAttribute("data-temp"));
        let education = this.state.dosen.education_histories;
        if (event.target.name.includes("tanggal")) {
            education[index][event.target.name] = (new Date(event.target.value)).getTime()
        } else {
            education[index][event.target.name] = event.target.value
        }
        let dosen = this.state.dosen
        dosen.education_histories = education
        this.setState({
            dosen: dosen
        })
    }

    handleOnDeleteEducations = (event) => {
        let index = event.target.getAttribute("data-index")
        let education = this.state.dosen.education_histories
        education.splice(index, 1);
        let dosen = this.state.dosen
        dosen.education_histories = education
        this.setState({
            dosen: dosen
        })
    }

    handleOnClickNavbar = (event) => {
        if (event.currentTarget.classList.contains("dropdown")) {
            event.currentTarget.classList.add("active");
            let element = event.currentTarget;
            if (element.classList.contains("dropdown")) {
                element.querySelector(".show").querySelector("i").classList.add("fa-caret-down");
                element.querySelector(".show").querySelector("i").classList.remove("fa-caret-left");
            }
        }
        let stage = event.currentTarget.getAttribute("data-stage");
        let page = event.currentTarget.getAttribute("data-page");
        this.setState({
            stage: Number(stage),
            page: Number(page),
            show: this.menu[stage]
        });
    }

    handleClikcChildNavbar = (event) => {
        let stage = event.currentTarget.getAttribute("data-stage");
        let page = event.currentTarget.getAttribute("data-page");
        this.setState({
            stage: Number(stage),
            child_page: Number(page),
            show: this.menu[stage]
        });
    }
    handleChangePageStage = (page, stage, child_page) => {
        this.setState({
            page: page,
            stage: stage,
            child_page: child_page,
            show: this.menu[stage]
        });
    }
    handleCancel = () => {
        this.source.cancel()
        this.source = axios.CancelToken.source()
    }
    handleChangeValue = (data)=>{
        localStorage.setItem("last_inserted", JSON.stringify(data));
        this.setState({
            dosen: data
        });
    }
    render() {
        return (
            <div className="page-content">
                <div className="locations">
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li>Tambahkan Dosen</li>
                    </ul>
                </div>
                <div className="page-add-dosen">
                <Loading handleCancel={this.handleCancel}></Loading>
                    <div className="navigation-add-dosen">
                        <div className="content-nav">
                            {this.state.stage === 0 && this.state.page === 1 && (
                                <SelectMethod changePageStage={this.handleChangePageStage} ></SelectMethod>
                            )}
                            {this.state.stage === 0 && this.state.page === 2 && (
                                <AboutMethod></AboutMethod>
                            )}

                            {this.state.stage === 1 && this.state.page === 1 && (
                                <ImportExcel></ImportExcel>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 1 && (
                                <DataDiri data={this.state.dosen.private_data} onChange={this.handleChangePrivatedata} provinsi={this.state.provinsi} ></DataDiri>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 2 && (
                                <DataPegawai data={this.state.dosen.detail_employee} onChange={this.handleChangeEmployee}></DataPegawai>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 3 && (
                                <DataPajak onDelete={this.handleOnDeletePajak} onChange={this.handleOnChangePajak} data={this.state.dosen.tax_details} addTax={this.handleAddPajak} ></DataPajak>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 4 && (
                                <DataKontrak onDelete={this.handleOnDeleteKontrak} onChange={this.handleOnChangeKontrak} data={this.state.dosen.contrats} addKontrak={this.handleAddKontrak} ></DataKontrak>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 5 && (
                                <DataMasaKerja onDelete={this.handleOnDeleteMasaKerja} onChange={this.handleOnChangeMasaKerja} data={this.state.dosen.years_of_service} addCard={this.handleAddMasaKerja} ></DataMasaKerja>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 6 && (
                                <DataUnpaid onDelete={this.handleOnDeleteUnpaid} onChange={this.handleOnChangeUnpaid} data={this.state.dosen.unpaid_history} addCard={this.handleAddUnpaid} ></DataUnpaid>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 7 && (
                                <DataChilds onDelete={this.handleOnDeleteChilds} onChange={this.handleOnChangeChilds} data={this.state.dosen.childs} addCard={this.handleAddChilds} ></DataChilds>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 8 && (
                                <DataPembayaran onChange={this.handleChangePayment} data={this.state.dosen.payment}></DataPembayaran>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 9 && (
                                <DataJabatan onDelete={this.handleOnDeletePostion} onChange={this.handleOnChangePostion} data={this.state.dosen.positions} addCard={this.handleAddPostion} ></DataJabatan>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 10 && (
                                <DataPangkat onDelete={this.handleOnDeleteRatings} onChange={this.handleOnChangeRatings} data={this.state.dosen.ratings} addCard={this.handleAddRatings} ></DataPangkat>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 11 && (
                                <DataSertifikasi onChange={this.handleChangeSertifikasi} data={this.state.dosen.certifications}></DataSertifikasi>
                            )}
                            {this.state.stage === 2 && this.state.page === 1 && this.state.child_page === 12 && (
                                <DataPendidikan onSend={this.handleSendData} success={this.state.success} onDelete={this.handleOnDeleteEducations} onChange={this.handleOnChangeEducations} data={this.state.dosen.education_histories} addCard={this.handleAddEducations} ></DataPendidikan>
                            )}
                            {this.state.stage === 2 && this.state.page === 2 && (
                                <Lampiran changeDosen={this.handleChangeValue} data={this.state.dosen} id={sessionStorage.getItem("last_inserted") ? this.state.dosen._id : null} ></Lampiran>
                            )}
                        </div>
                        <div className="navigation">
                            <ul>
                                {
                                    this.state.show.map((item, index) => {
                                        if (item[0] === "yes") {
                                            return (
                                                <li key={index} data-stage={item[4]} data-page={item[3]} onClick={this.handleOnClickNavbar} className={index === Number(this.state.page - 1) ? "add-dosen active dropdwon" : "add-dosen dropdown"} >
                                                    <div className="show">
                                                        <span className={item[1]}></span>{" " + item[2]} <i className="fas fa-caret-down"></i>
                                                    </div>
                                                    <ul>
                                                        {
                                                            item[5].map((item_child, index_child) => {
                                                                return (
                                                                    <li data-stage={item[4]} data-page={item_child[2]} key={index_child} onClick={this.handleClikcChildNavbar} className={index_child === Number(this.state.child_page - 1) ? "active" : ""}>
                                                                        <span className={item_child[0]}></span> {item_child[1]}
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li data-stage={item[4]} data-page={item[3]} key={index} onClick={this.handleOnClickNavbar} className={index === Number(this.state.page - 1) ? "add-dosen active" : "add-dosen"}>
                                                    <div className="show">
                                                        <span className={item[1]}></span> {item[2]}
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const reduxState = (state) => (
    {
        isLogin: state.isLogin,
        notif: state.notif,
        token: state.token,
        user: state.user,
        dosen_edited: state.dosen_edited
    }
)
const reduxDispatch = (dispatch) => ({
    addPegawai: (data, cancelToken) => dispatch(actionaddDataPegawaiAPI(data, cancelToken)),
    updatePegawai : (data, cancelToken) =>dispatch(actionUpdateEmployee(data, cancelToken))
})
export default connect(reduxState, reduxDispatch)(AddDosen)