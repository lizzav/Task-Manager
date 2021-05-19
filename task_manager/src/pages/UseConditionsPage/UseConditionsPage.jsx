import React from "react";

import "./UseConditionsPage.scss";
import Header from "../../component/Header";



function UseConditionsPage() {
  return (
    <div className="use-page">
      <Header />
      <div className="use-page__content">
        <div className="use-page__header">Условия использования</div>
        <div className="use-page__text">

          <div className="use-page__text-bold">
            Благодарим за использование нашего приложения ToDo! Эти Условия
            использования ToDo (настоящие «Условия» ) описывают ваши права и
            обязанности как клиента нашего приложения.
          </div>
          <div>
            Настоящие Условия вступают в силу с даты, когда вы впервые нажимаете
            «Я согласен» (или аналогичную кнопку или флажок) или используете
            облачный продукт или получаете доступ к нему, в зависимости от того,
            что наступит раньше («Дата вступления в силу»). Для бесплатных
            продуктов вы также выражаете свое согласие с настоящими Условиями,
            открывая или используя соответствующий бесплатный продукт.
          </div>
          <div className="use-page__text-bold">1. Наша политика безопасности и конфиденциальности данных.</div>
          <div>
            1.1. Безопасность и сертификаты . Мы внедряем и поддерживаем
            физические, технические и административные меры безопасности,
            предназначенные для защиты ваших данных от несанкционированного
            доступа, уничтожения, использования, изменения или раскрытия. Мы
            также поддерживаем программу соответствия, которая включает
            независимые сторонние аудиты и сертификаты. Наш Центр управления
            безопасностью , который время от времени обновляется, предоставляет
            дополнительную информацию о наших мерах безопасности и сертификатах.
          </div>
          <div>
            1.2. Конфиденциальность . Мы собираем определенные данные и
            информацию о вас и ваших Конечных пользователях в связи с
            использованием вами и вашими Конечными пользователями облачных
            продуктов, а также иным образом в связи с настоящими Условиями. Мы
            собираем и используем все такие данные и информацию в соответствии с
            нашей Политикой конфиденциальности , которую вы подтверждаете.
          </div>
          <div>
            1.3. Улучшение нашего продукта . Мы всегда стремимся улучшать наш
            продукт. Для этого мы используем методы аналитики, чтобы лучше
            понять, как используются наши облачные продукты. Для получения
            дополнительной информации об этих методах и типах собираемых данных,
            пожалуйста, ознакомьтесь с нашей Политикой конфиденциальности .
          </div>
          <div className="use-page__text-bold">2. Условия, применимые к вашим данным.</div>
          <div>
            2.1. Использование ваших данных для предоставления вам нашего
            продукта . Вы сохраняете за собой все права, права собственности и
            интересы в отношении ваших Данных в форме, отправленной для нашего
            продукта. В соответствии с настоящими Условиями и исключительно в
            той мере, в какой это необходимо для предоставления вам нашего
            продукта, вы предоставляете нам глобальную ограниченную лицензию на
            доступ, использование, обработку, копирование, распространение,
            выполнение, экспорт и отображение ваших данных. Исключительно в той
            степени, в которой переформатирование ваших данных для отображения в
            облачном продукте представляет собой модификацию или производную
            работу, вышеупомянутая лицензия также включает право вносить
            изменения и производные работы. Мы также можем получить доступ к
            вашим учетным записям, учетным записям конечных пользователей и
            вашим облачным продуктам с разрешения конечного пользователя, чтобы
            отвечать на ваши запросы в службу поддержки.
          </div>
          <div>
            2.2. Ваши обязательства по соблюдению данных . Вы и ваше
            использование нашего продукта (включая использование вашими
            Конечными пользователями) должны всегда соблюдать настоящие Условия,
            Политику допустимого использования. и все Законы. Вы заявляете и
            гарантируете, что: вы получили все необходимые права, выпуски и
            разрешения для отправки всех ваших данных в облачные продукты и для
            предоставления прав, предоставленных нам в настоящих Условиях, и
            ваших данных, их отправки и использования как вы разрешаете в
            настоящих Условиях, не будет нарушать какие-либо законы, любую
            стороннюю интеллектуальную собственность, конфиденциальность,
            гласность или другие права или какие-либо ваши или сторонние
            политики или условия, регулирующие ваши данные. За исключением наших
            явных обязательств в соответствии, мы не несем никакой
            ответственности за ваши данные, и вы несете единоличную
            ответственность за свои данные и последствия их отправки и
            использования с облачными продуктами.
          </div>
          <div className="use-page__text-bold">3 Срок действия и прекращение действия.</div>
          <div>
            3.1. Срок . Настоящие Условия вступают в силу с Даты вступления в
            силу и истекают в день истечения или прекращения всех Условий
            подписки.
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseConditionsPage;