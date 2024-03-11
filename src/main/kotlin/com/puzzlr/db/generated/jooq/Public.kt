/*
 * This file is generated by jOOQ.
 */
package generated.jooq


import generated.jooq.sequences.USERS_ID_SEQ
import generated.jooq.tables.Users

import kotlin.collections.List

import org.jooq.Catalog
import org.jooq.Sequence
import org.jooq.Table
import org.jooq.impl.SchemaImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
class Public : SchemaImpl("public", DefaultCatalog.DEFAULT_CATALOG) {
    companion object {

        /**
         * The reference instance of <code>public</code>
         */
        val PUBLIC = Public()
    }

    /**
     * The table <code>public.users</code>.
     */
    val USERS get() = Users.USERS

    override fun getCatalog(): Catalog = DefaultCatalog.DEFAULT_CATALOG

    override fun getSequences(): List<Sequence<*>> = listOf(
        USERS_ID_SEQ
    )

    override fun getTables(): List<Table<*>> = listOf(
        Users.USERS
    )
}
