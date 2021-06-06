import React, { Component } from 'react'
import './index.css'
import { connect } from 'react-redux'
import Loading from '../Loading'
import axios from 'axios'
import { actiondeleteDosen, actionGetDosenByID } from '../../../config/redux/action'
import { APIBASE } from '../../../config/constants'
class DataDosen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 1,
            dosens: {
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
            }
        }
        this.source = axios.CancelToken.source()
    }
    handleOnClikcNavbar = (event) => {
        let elements = document.getElementsByClassName("navbar-item-token active")
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            element.classList.remove("active")
        }
        let id = event.currentTarget.getAttribute("data-id")
        this.setState({
            active: Number(id)
        })
        event.currentTarget.classList.add("active")
    }
    componentDidMount = () => {
        let id = this.props.match.params.id
        // console.log(sessionStorage.getItem("/dosen/" + id))
        if (sessionStorage.getItem("/dosen/" + id)) {

            this.setState({
                dosens: JSON.parse(sessionStorage.getItem("/dosen/" + id))
            })
        } else if (this.props.dosen_view !== undefined) {
            if (this.props.dosen_view._id !== id) {
                this.props.actiongetDosenById(id, this.source.token)
                    .then(result => {
                        this.setState({
                            dosens: this.props.dosen_view
                        })

                    }).catch(err => {
                        this.setState({
                            dosens: {}
                        })
                    })
            } else {
                this.setState({
                    dosens: this.props.dosen_view
                })
            }
        } else {
            this.props.actiongetDosenById(id, this.source.token)
                .then(result => {
                    this.setState({
                        dosens: this.props.dosen_view
                    })
                }).catch(err => {
                    this.setState({
                        dosens: {}
                    })
                })
        }
    }
    componentWillUnmount = async () => {
        this.source.cancel()
    }
    handleCancelUpdate = () => {
        this.source.cancel()
        this.source = axios.CancelToken.source()
    }
    handleChangeActive = (event) => {
        let active = Number(event.currentTarget.getAttribute("data-active"));
        this.setState({
            active: active
        })
    }
    handleEditDosen = (event)=>{
        const {history} =  this.props
        localStorage.setItem("last_inserted", JSON.stringify(this.state.dosens));
        history.push("/dosen/add")
    }
    hadnleDeleteDosen = async (event)=>{
        let id = this.props.match.params.id
        this.props.actionDeleteDosen(id,this.source.token)
        .then(result=>{
            this.source = axios.CancelToken.source();
            localStorage.removeItem("last_inserted");
            const {history} =  this.props
            alert("Berhasil menghapus data data");
            history.push("/dosen/")
        }).catch(err=>{
            alert("Gagal menghapus data");
            console.log(err);
        })
    }
    render() {
        return (
            <div className="page-content">
                <div className="page-data-dosen">
                    <Loading handleCancel={this.handleCancelUpdate}></Loading>
                    {
                        this.state.active === 1 && (
                            <div className="data-view-employee">
                                <div className="side-left">
                                    <div className="profile">
                                        <h4>{this.state.dosens.private_data.nama}</h4>
                                        <img src={this.state.dosens.private_data.foto_diri.search("upload") === 0 ? APIBASE + this.state.dosens.private_data.foto_diri : this.state.dosens.private_data.foto_diri} alt="Disin" />
                                        <div className="setting-data">
                                            <button onClick={this.handleEditDosen} className="btn btn-primary button-rounded" > <i className="fas fa-edit"></i> Edit</button>
                                            <button onClick={this.hadnleDeleteDosen} className=" ml-auto btn btn-danger button-rounded"> <i className="fas fa-trash"></i> Hapus</button>
                                        </div>
                                    </div>
                                    <div className="data-diri">
                                        <h5>Data Diri</h5>
                                        <div className="item-data-diri">
                                            <strong>Jenis Kelamin</strong>
                                            <p>{this.state.dosens.private_data.jenis_kelamin}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>Email</strong>
                                            <p>{this.state.dosens.private_data.email}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>Telepon</strong>
                                            <p>{this.state.dosens.private_data.telepon}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>HP</strong>
                                            <p>{this.state.dosens.private_data.no_hp}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>Provinsi</strong>
                                            <p>{this.state.dosens.private_data.provinsi}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>Kabupaten</strong>
                                            <p>{this.state.dosens.private_data.kabupaten}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>Kecamatan</strong>
                                            <p>{this.state.dosens.private_data.kecamatan}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>Kelurahan</strong>
                                            <p>{this.state.dosens.private_data.kelurahan}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>Alamat</strong>
                                            <p>{this.state.dosens.private_data.alamat}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>Tempat Lahir</strong>
                                            <p>{this.state.dosens.private_data.tempat_lahir}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>Tanggal Lahir</strong>
                                            <p>{(new Date(this.state.dosens.private_data.tanggal_lahir).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric" }))}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>BPJS Kesehatan</strong>
                                            <p>{this.state.dosens.private_data.bpjs_kesehatan}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>BPJS Ketenagakerjaan</strong>
                                            <p>{this.state.dosens.private_data.bpjs_ketenagakerjaan}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>Agama</strong>
                                            <p>{this.state.dosens.private_data.agama}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <strong>No KTP</strong>
                                            <p>{this.state.dosens.private_data.no_ktp}</p>
                                        </div>
                                        <div className="item-data-diri">
                                            <button data-active="2" onClick={this.handleChangeActive} className="btn btn-primary button-rounded"> <i className="fas fa-paperclip"></i> Lampiran</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="side-right">
                                    <div className="section-right">
                                        <div className="header-section">
                                            <h4>Data Keluarga</h4>
                                        </div>
                                        {this.state.dosens.private_data.status_nikah === "Belum Menikah" && (
                                            <div className="content-section">
                                                <h6>Belum Menikah</h6>
                                            </div>
                                        )}
                                        {this.state.dosens.private_data.status_nikah !== "Belum Menikah" && (
                                            <div className="content-section">
                                                <div className="data-wrap">
                                                    <strong>Nama Pasangan</strong>
                                                    <p>{this.state.dosens.private_data.nama_pasangan}</p>
                                                </div>
                                                <div className="data-wrap">
                                                    <strong>Tanggal Lahir Pasangan</strong>
                                                    <p>{(new Date(this.state.dosens.private_data.tanggal_lahir_pasangan).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric" }))}</p>
                                                </div>
                                                <div className="data-wrap">
                                                    <strong>Tempat Lahir Pasangan</strong>
                                                    <p>{this.state.dosens.private_data.tempat_lahir_pasangan}</p>
                                                </div>
                                                <div className="temp-inside">
                                                    {this.state.dosens.childs.sort((a, b) => { return (new Date(b.tanggal_lahir_anak)).getTime() > (new Date(a.tanggal_lahir_anak)).getTime() }).map((item, index) => {
                                                        return (
                                                            <div className="data-inside">
                                                                <h5>Anak ke {index + 1}</h5>
                                                                <div className="data-wrap">
                                                                    <strong>Nama Anak</strong>
                                                                    <p>{item.nama_anak}</p>
                                                                </div>
                                                                <div className="data-wrap">
                                                                    <strong>Tempat Lahir Anak</strong>
                                                                    <p>{item.tempat_lahir_anak}</p>
                                                                </div>
                                                                <div className="data-wrap">
                                                                    <strong>Tanggal Lahir Anak</strong>
                                                                    <p>{(new Date(item.tanggal_lahir_anak).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric" }))}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="section-right">
                                        <div className="header-section">
                                            <h4>Data Pegawai</h4>
                                        </div>
                                        <div className="content-section">
                                            <div className="data-row">
                                                <div className="item-row">
                                                    <div className="data-wrap">
                                                        <strong>NIP</strong>
                                                        <p>{this.state.dosens.private_data.nip}</p>
                                                    </div>
                                                    <div className="data-wrap">
                                                        <strong>NIDN</strong>
                                                        <p>{this.state.dosens.private_data.nidn}</p>
                                                    </div>
                                                    <div className="data-wrap">
                                                        <strong>Kode</strong>
                                                        <p>{this.state.dosens.detail_employee.kode}</p>
                                                    </div>
                                                    <div className="data-wrap">
                                                        <strong>Tanggal Masuk</strong>
                                                        <p>{(new Date(this.state.dosens.detail_employee.tanggal_masuk).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric" }))}</p>
                                                    </div>
                                                    <div className="data-wrap">
                                                        <strong>Tanggal Keluar</strong>
                                                        <p>  {this.state.dosens.detail_employee.tanggal_keluar ? (new Date(this.state.dosens.detail_employee.tanggal_keluar).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric" })) : "-"}</p>
                                                    </div>
                                                    <div className="data-wrap">
                                                        <strong>Klasifikasi</strong>
                                                        <p>{this.state.dosens.detail_employee.klasifikasi}</p>
                                                    </div>
                                                </div>
                                                <div className="item-row">
                                                    <div className="data-wrap">
                                                        <strong>Fakultas</strong>
                                                        <p>{this.state.dosens.detail_employee.fakultas}</p>
                                                    </div>
                                                    <div className="data-wrap">
                                                        <strong>Prodi</strong>
                                                        <p>{this.state.dosens.detail_employee.prodi}</p>
                                                    </div>
                                                    <div className="data-wrap">
                                                        <strong>Bank Transfer</strong>
                                                        <p>{this.state.dosens.payment.bank_transfer}</p>
                                                    </div>
                                                    <div className="data-wrap">
                                                        <strong>Cabang Bank</strong>
                                                        <p>{this.state.dosens.payment.cabang}</p>
                                                    </div>
                                                    <div className="data-wrap">
                                                        <strong>Pemilik Akun</strong>
                                                        <p>{this.state.dosens.payment.account_holder}</p>
                                                    </div>
                                                    <div className="data-wrap">
                                                        <strong>No Rekening</strong>
                                                        <p>{this.state.dosens.payment.no_rekening}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="section-right">
                                        <div className="header-section">
                                            <h4>Riwayat Masa Kerja</h4>
                                        </div>
                                        <div className="content-section">
                                            <div className="temp-inside">
                                                {this.state.dosens.years_of_service.sort((a, b) => { return (new Date(b.tanggal_masuk)).getTime() > (new Date(a.tanggal_masuk)).getTime() }).map((item, index) => {
                                                    return (
                                                        <div className="data-inside">
                                                            <div className="data-wrap">
                                                                <strong>Masa Kerja</strong>
                                                                <p>{item.masa_kerja}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Aktif/TSDP</strong>
                                                                <p>{item.aktif_tsdp}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Tanggal Masuk</strong>
                                                                <p>{(new Date(item.tanggal_masuk).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric" }))}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Keterangan</strong>
                                                                <p>{item.keterangan}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="section-right">
                                        <div className="header-section">
                                            <h5>Riwayat Jabatan</h5>
                                        </div>
                                        <div className="content-section">
                                            <div className="temp-inside">
                                                {this.state.dosens.positions.sort((a, b) => {
                                                    return (new Date(b.tmt)).getTime() > (new Date(a.tmt)).getTime()
                                                }).map((item, index) => {
                                                    return (
                                                        <div key={index} className="data-inside">
                                                            <div className="data-wrap">
                                                                <strong>Jabatan Struktural</strong>
                                                                <p>{item.jabatan_struktural}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Jabatan Fungsional</strong>
                                                                <p>{item.jabatan_fungsional}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>No SK Jabatan Fungsional</strong>
                                                                <p>{item.no_sk_jabatan_fungsional}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>JFD Kum</strong>
                                                                <p>{item.jfd_kum}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Terhitung Mulai Tanggal</strong>
                                                                <p>{(new Date(item.tmt).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric" }))}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="section-right">
                                        <div className="header-section">
                                            <h4>Golongan/Pangkat</h4>
                                        </div>
                                        <div className="content-section">
                                            <div className="temp-inside">
                                                {this.state.dosens.ratings.map((item, index) => {
                                                    return (
                                                        <div key={index} className="data-inside">
                                                            <div className="data-wrap">
                                                                <strong>NO SK Inpassing</strong>
                                                                <p>{item.no_sk_inpassing}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Pangkat In passing</strong>
                                                                <p>{item.pangkat_inpassing}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Golongan</strong>
                                                                <p>{item.golongan}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Terhitung Mulai Tanggal</strong>
                                                                <p>{(new Date(item.tmt).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric" }))}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="section-right">
                                        <div className="header-section">
                                            <h4>History Pendidikan</h4>
                                        </div>
                                        <div className="content-section">
                                            <div className="temp-inside">
                                                {this.state.dosens.education_histories.map((item, index) => {
                                                    return (
                                                        <div key={index} className="data-inside">
                                                            <div className="data-wrap">
                                                                <strong>Instansi</strong>
                                                                <p>{item.instansi}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Nama Pendidikan</strong>
                                                                <p>{item.nama_pendidikan}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Nilai</strong>
                                                                <p>{item.nilai}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Jurusan</strong>
                                                                <p>{item.jurusan}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Tanggal Masuk</strong>
                                                                <p>{(new Date(item.tanggal_masuk).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric" }))}</p>
                                                            </div>
                                                            <div className="data-wrap">
                                                                <strong>Tanggal Keluar</strong>
                                                                <p>{item.tanggal_keluar ? (new Date(item.tanggal_keluar).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric" })) : "-"}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="section-right">
                                        <div className="header-section">
                                            <h4>Sertifikasi</h4>
                                        </div>
                                        <div className="content-section">
                                            <div className="data-wrap">
                                                <strong>Nomor Sertifikasi</strong>
                                                <p>{this.state.dosens.certifications.nomor_sertifikasi}</p>
                                            </div>
                                            <div className="data-wrap">
                                                <strong>Tanggal Sertifikasi</strong>
                                                <p>{(new Date(this.state.dosens.certifications.tanggal_sertifikasi).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "long", year: "numeric" }))}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {this.state.active === 2 && (
                        <div className="data-view-lampiran">
                            <h4>Lampiran</h4>
                            <div className="item-data-diri">
                                <button data-active="1" onClick={this.handleChangeActive} className="btn btn-primary button-rounded"> <i className="fas fa-address-card"></i> Data Lengkap</button>
                            </div>
                            <div className="row-file">
                                {
                                    this.state.dosens.lampiran.map((item, index) => {
                                        return (
                                            <div key={index} className="item-file">
                                                {item.file_type.toLowerCase() === "image" && (
                                                    item.save_method.toLowerCase() === "link" ? <img src={item.link} alt="" /> : <img src={ APIBASE + item.link} alt="" />
                                                )}
                                                {item.file_type.toLowerCase() === "pdf" && (
                                                    <i className="fas fa-file-pdf file"></i>
                                                )}
                                                {item.file_type.toLowerCase() !== "image" && item.file_type.toLowerCase() !== "pdf" && (
                                                    <i className="fas fa-file-alt file"></i>
                                                )}
                                                <div className="temp mt-2">
                                                <a rel="noreferrer" target="_blank" href={item.save_method.toLowerCase() === "link" ? item.link : APIBASE + item.link}>{item.file_name}</a>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        )
    }
}
const reduxState = (state) => (
    {
        isLoading: state.isLoading,
        dosen_view: state.dosen_view
    }
)
const reduxDispatch = (dispatch) => ({
    actiongetDosenById: (idDosen, CancelToken) => dispatch(actionGetDosenByID(idDosen, CancelToken)),
    actionDeleteDosen: (idDosen, CancelToken)=>dispatch(actiondeleteDosen(idDosen, CancelToken)),
})
export default connect(reduxState, reduxDispatch)(DataDosen)