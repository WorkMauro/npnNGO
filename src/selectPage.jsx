import styles from './selectPage.module.css'


const SelectPage = () => {
return(
    <div className={styles.background}>
        <div className={styles.select}>
            <a href={"/pedidos"}>Atendente</a>
        </div>
        <div className={styles.select}>
            <a href={"/separarPage"}>Separador</a>
        </div>
    </div>
);
}
export default SelectPage