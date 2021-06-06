import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Loading from '../Loading'
// import NotFoundImg from '../../../assets/img/icon/data-not-found.png'
import './index.css'
import { actionSendTokenData } from '../../../config/redux/action'
import { APIBASE } from '../../../config/constants'
class TakeData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            field: {
                token: "",
                email: ""
            },
            active: 0,
            dosens: {}
        }
        this.source = axios.CancelToken.source()
    }
    handleOnChangeTokenValue = (event) => {
        let field = this.state.field
        field[event.currentTarget.name] = event.currentTarget.value
        this.setState({
            field: field
        })
    }
    handleOnClickToken = async (event) => {
        let data = this.state.field
        this.props.actionSendToken(data, this.source.token)
            .then(result => {
                this.setState({
                    dosens: result,
                    active: 1
                })
            })
            .catch(err => {
                this.setState({
                    active: -1
                })
            })
    }
    handleChangeActive = (event) => {
        let active = Number(event.currentTarget.getAttribute("data-active"));
        this.setState({
            active: active
        })
    }
    handleCancel = () => {
        this.source.cancel()
        this.source = axios.CancelToken.source()
    }
    render() {
        return (
            <div className="container">
                <Loading handleCancel={this.handleCancel}></Loading>
                <div className="page-80vh p-3">
                    <h2>Data Dosen</h2>
                    <div className="header-setting">
                        <div className="input-token">
                            <input value={this.state.field.email} onChange={this.handleOnChangeTokenValue} placeholder="Masukkan Email Disini" type="email" name="email" id="email" />
                        </div>
                        <div className="input-token">
                            <input value={this.state.field.token} onChange={this.handleOnChangeTokenValue} placeholder="Masukkan Token Disini" type="text" name="token" id="token" />
                            <button onClick={this.handleOnClickToken}><i className="fas fa-paper-plane"></i></button>
                        </div>

                    </div>
                    <div className="data">

                        {
                            this.state.active === 1 && (
                                <div className="data-view-employee">
                                    <div className="side-left">
                                        <div className="profile">
                                            <h4>{this.state.dosens.private_data.nama}</h4>
                                            <img src={this.state.dosens.private_data.foto_diri.search("upload") === 0 ? APIBASE + this.state.dosens.private_data.foto_diri : this.state.dosens.private_data.foto_diri} alt="Disin" />
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
            </div>
        )
    }
}
const reduxState = (state) => (
    {
        isLoading: state.isLoading
    }
)
const reduxDispatch = (dispatch) => ({
    actionSendToken: (data, token) => dispatch(actionSendTokenData(data, token))
    // actionSearch: (data, token) => dispatch(actionSearchDosen(data, token))
})
export default connect(reduxState, reduxDispatch)(TakeData)